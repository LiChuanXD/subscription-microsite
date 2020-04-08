import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchOutlet } from '../redux/actions/actions';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            admin : "",
            auth : false
        };
    };

    componentDidMount(){
        this.props.fetchOutlet();
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

        const renderTable = auth => {
            if(auth === false){
                return(
                    <div>
                        
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
                                    <th>{this.props.outlet.avenue.available}</th>
                                    <th>{this.props.outlet.avenue.a}</th>
                                    <th>{this.props.outlet.avenue.b}</th>
                                </tr>

                                <tr>
                                    <th>Live Pharmacy</th>
                                    <th>15</th>
                                    <th>{this.props.outlet.live.available}</th>
                                    <th>{this.props.outlet.live.a}</th>
                                    <th>{this.props.outlet.live.b}</th>
                                </tr>
                                <tr>
                                    <th>Day Pharmacy</th>
                                    <th>15</th>
                                    <th>{this.props.outlet.day.available}</th>
                                    <th>{this.props.outlet.day.a}</th>
                                    <th>{this.props.outlet.day.b}</th>
                                </tr>
                                <tr>
                                    <th>Pro Pharmacy</th>
                                    <th>15</th>
                                    <th>{this.props.outlet.pro.available}</th>
                                    <th>{this.props.outlet.pro.a}</th>
                                    <th>{this.props.outlet.pro.b}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        return(
            <div className="white-page">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb row">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            Admin
                        </li>
                    </ol>
                </nav>
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

const mapDispatchToProps = dispatch => {
    return{
        fetchOutlet : ()=>dispatch(fetchOutlet())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Admin);