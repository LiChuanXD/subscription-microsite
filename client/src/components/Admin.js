import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            admin : "",
            auth : false
        };
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            admin : e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.admin === "r3a1ADMIN"){
            this.setState({
                auth : true,
                admin : ""
            });
        }else{
            this.setState({
                auth : false,
                admin : ""
            })
        }
    }

    render(){
        const avenue = this.props.outlet[0]
        const live = this.props.outlet[1]
        const day = this.props.outlet[2]
        const pro = this.props.outlet[3]

        const renderTable = auth => {
            if(auth === false){
                return(
                    <div>
                        Allo
                    </div>
                )
            }else{
                return(
                    <div>
                        <table className="table table-bordered white-page">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Outlet Name</th>
                                    <th>Total Allocations</th>
                                    <th>Remaining Allocation(s)</th>
                                    <th>Product A (sold)</th>
                                    <th>Product B (sold)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th>Avenue Pharmacy</th>
                                    <th>15</th>
                                    <th>{avenue.available}</th>
                                    <th>{avenue.a}</th>
                                    <th>{avenue.b}</th>
                                </tr>

                                <tr>
                                    <th>Live Pharmacy</th>
                                    <th>15</th>
                                    <th>{live.available}</th>
                                    <th>{live.a}</th>
                                    <th>{live.b}</th>
                                </tr>
                                <tr>
                                    <th>Avenue Pharmacy</th>
                                    <th>15</th>
                                    <th>{day.available}</th>
                                    <th>{day.a}</th>
                                    <th>{day.b}</th>
                                </tr>
                                <tr>
                                    <th>Avenue Pharmacy</th>
                                    <th>15</th>
                                    <th>{pro.available}</th>
                                    <th>{pro.a}</th>
                                    <th>{pro.b}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        return(
            <div className="white-page mt-5">
                {this.state.auth ? (null) : (
                    <form onSubmit={this.handleSubmit}>
                    <label htmlFor="admin">ADMIN</label>
                    <input value={this.state.admin} onChange={this.handleChange} type="text" name="admin" id="admin" placeholder="*ID" />
                    <input type="submit" value="Login as Admin" />
                </form>
                )}
                {renderTable(this.state.auth)}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return{
        outlet : state.outlet
    };
};

export default connect(mapStateToProps , null)(Admin);