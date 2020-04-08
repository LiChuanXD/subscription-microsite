import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import  {fetchOutlet} from '../redux/actions/actions';

class Select extends Component{
    componentDidMount(){
        this.props.fetchOutlet();
    };

    render(){
        const {outlet} = this.props;

        const outputName = name => {
            if(name === "avenue"){
                return "Avenue Pharmacy"
            }else if(name === "live"){
                return "Live Pharmacy"
            }else if(name === "day"){
                return "Day Pharmacy"
            }else if(name === "pro"){
                return "Pro Pharmacy"
            }else{
                return null
            };
        };

        return(
            <div className="select-page">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb row">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            Select
                        </li>
                    </ol>
                </nav>
                <div className="select-box">
                    <Link to={`/select/${outlet.avenue.outlet}`} className="d-block">{outputName(outlet.avenue.outlet)}</Link>
                </div>
    
                <div className="select-box">
                    <Link to={`/select/${outlet.live.outlet}`} className="d-block">{outputName(outlet.live.outlet)}</Link>
                </div>
    
                <div className="select-box">
                    <Link to={`/select/${outlet.day.outlet}`} className="d-block">{outputName(outlet.day.outlet)}</Link>
                </div>
                
                <div className="select-box">
                    <Link to={`/select/${outlet.pro.outlet}`} className="d-block">{outputName(outlet.pro.outlet)}</Link>
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

const mapDispatchToProps = dispatch => {
    return{
        fetchOutlet : ()=>dispatch(fetchOutlet())
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Select);