import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/actions';

class Dashboard extends Component {
    handleLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/user');
    };


    render(){
        if(this.props.user.auth === false){
            //if not auth
            return(
                <div className="white-page">
                    <h1>Please Log In to view data</h1>
                    <Link to="/user/login">Log In</Link>
                </div>
            )
        }else{
            const buyNew = length =>{
                if(length === 4){
                    return(
                        <div className="text-center">
                            <button className="btn btn-light bg-light form-control" data-toggle="modal" data-target="#disableModal" >
                                Buy New Batch
                            </button>
        
                            <div className="modal fade" id="disableModal" tabIndex="-1" role="dialog" aria-labelledby="disabled" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3>User Quota Reached!</h3>
                                        </div>
        
                                        <div className="modal-body">
                                            <p>Quota for this number has reached the limit</p>
                                        </div>
        
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className="text-center">
                            <Link className="btn btn-light bg-light form-control" to="/purchase">Buy New Batch</Link>
                        </div>
                    )
                }
            };

            const receipt = this.props.user.purchases.length ? (
                this.props.user.purchases.map(x=>{
                    const date = new Date(x.date);
                    const nameFunc = name => {
                        if(name === "avenue"){
                            return "Avenue Pharmacy"
                        }else if(name === "live"){
                            return "Live Pharmacy"
                        }else if(name === "day"){
                            return "Day Pharmacy"
                        }else if(name === "pro"){
                            return "Pro Pharmacy"
                        }
                    };

                    return(
                        <div className="receipt-box" key={x._id}>
                            <p><small>{nameFunc(x.outlet)}</small></p>
                            <div>
                                <p>Product A : {x.a}</p>
                                <p>Product B : {x.b}</p>
                            </div>
                            <p className="date">{date.toLocaleString()}</p>
                        </div>
                    )
                })
            ) : (null)

            return(
                <div id="dashboard" className="white-page">
                    <div id="dash-info" className="mt-1">
                        <div className="ml-5">
                            <h3>{this.props.user.name}</h3>
                        </div>
                        <div className="mr-5">
                            <h3>{this.props.user.number}</h3>
                        </div>
                        <button className="btn btn-danger mr-1" onClick={this.handleLogout}>Log Out</button>
                    </div>

                    <div id="receipt">
                        {receipt}
                    </div>

                    {buyNew(this.props.user.purchases.length)}

                </div>
            )
        }
    }
};

const mapStateToProps = state => {
    return{
        user : state.member
    };
};

const mapDispatchToProps = dispatch => {
    return{
        logoutUser : ()=>dispatch(logoutUser())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Dashboard);