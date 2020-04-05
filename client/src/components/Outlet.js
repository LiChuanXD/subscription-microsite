import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Outlet = (props) => {
    const selected = props.match.params.outlet;

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

    const avenue = props.outlet[0];
    const live = props.outlet[1];
    const day = props.outlet[2];
    const pro = props.outlet[3];

    const slotOutput = name => {
        if(name === "avenue"){
            return avenue.available
        }else if(name === "live"){
            return live.available
        }else if(name === "day"){
            return day.available
        }else if(name === "pro"){
            return pro.available
        }
    };

    return(
        <div className="select-page">

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
                                <h4>{slotOutput(selected)}</h4>
                                <h4>Out of 15</h4>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width : `${slotOutput(selected) * 7}%`}}></div>
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
};

const mapStateToProps = state => {
    return{
        outlet : state.outlet
    }
};

export default connect(mapStateToProps , null)(Outlet);