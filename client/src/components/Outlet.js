import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOutlet } from '../redux/actions/actions';

class Outlet extends Component {
    componentDidMount(){
        this.props.fetchOutlet();
    };

    render(){
        const selected = this.props.match.params.outlet;
        const selectedOutlet = this.props.outlet[selected];

        const nameOutput = name =>{
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
            }
        };

        return(
            <div className="select-page">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb row">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/select">Select</Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            Outlet
                        </li>
                    </ol>
                </nav>

                <h1 className="text-center white-page">{nameOutput(selected)}</h1>
                <div className="select-box">
                    <p className="d-block" data-toggle="modal" data-target="#statusModal">STATUS</p>

                    <div className="modal fade" id="statusModal" tabIndex="-1" role="dialog" aria-labelledby="status-modal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>Store Status : {nameOutput(selected)}</h2>
                                </div>

                                <div className="modal-body">
                                    <h3>Availability Status</h3>
                                    <h4>{selectedOutlet.available}</h4>
                                    <h4>Out of 15</h4>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width : `${selectedOutlet.available * 7}%`}}></div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="select-box">
                    <Link className="d-block" to="/user">USERS</Link>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return{
        outlet : state.outlet
    }
};

const mapDispatchToProps = dispatch => {
    return{
        fetchOutlet : ()=>dispatch(fetchOutlet())
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(Outlet);