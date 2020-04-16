require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');

const app = express();

//middlewares
//helmet
app.use(helmet());
//body parse
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//indexed db testing
if(!window.indexedDB){
    console.log("Browser does not support IndexedDB")
};

const db;
const request = window.indexedDB.open("TestingDB" , 1);

request.onerror = e => {
    console.log("Request Error Occured");
}

request.onsuccess = e => {
    db = e.target.result
}

console.log("DB = " , db)

//indexed db testing end

//connect to mongodb
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify : false
    },
    err=>{
        if(err) throw err;
        console.log("connected to database :)")
    }
)

//routes
app.use('/api/outlet' , require('./routes/api/outlet'));
app.use('/api/user' , require('./routes/api/member'));
app.use('/api/purchase' , require('./routes/api/purchase'));

//set static folder after deployed
if(process.env.NODE_ENV === "production"){
    app.use('/' , express.static(path.join(__dirname , "client" , "build")));

    app.get('*' , (req , res)=>{
        res.sendFile(path.join(__dirname , "client" , "build" , "index.html"))
    });
};


//listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>console.log(`server running on port ${PORT}`));
