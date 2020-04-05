import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';

class Select extends Component{

    render(){
        const avenue = this.props.outlet[0].outlet;
        const live = this.props.outlet[1].outlet;
        const day = this.props.outlet[2].outlet;
        const pro = this.props.outlet[3].outlet;

        const nameOutput = name =>{
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
            <div className="select-page">
                <div className="select-box">
                    <Link to={`/select/${avenue}`} className="d-block">{nameOutput(avenue)}</Link>
                </div>
    
                <div className="select-box">
                    <Link to={`/select/${live}`} className="d-block">{nameOutput(live)}</Link>
                </div>
    
                <div className="select-box">
                    <Link to={`/select/${day}`} className="d-block">{nameOutput(day)}</Link>
                </div>
                
                <div className="select-box">
                    <Link to={`/select/${pro}`} className="d-block">{nameOutput(pro)}</Link>
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return{
        outlet : state.outlet
    };
};

//const mapDispatchToProps = dispatch => {
//    return{
//        fetchOutlet : ()=>dispatch(fetchOutlet())
//    }
//};

export default connect(mapStateToProps , null)(Select);