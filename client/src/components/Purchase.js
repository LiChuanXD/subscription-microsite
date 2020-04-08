import React , { Component } from 'react';
import { connect } from 'react-redux';
import { buyItems , clearError } from '../redux/actions/actions';
import { Redirect } from 'react-router-dom';

class Purchase extends Component {
    constructor(props){
        super(props);
        this.state = {
            outlet : "",
            a : "",
            b : ""
        };
    };

    handleChange = e =>   {
        this.setState({
            ...this.state,
            [e.target.id] : e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { outlet , a , b } = this.state;
        const number = this.props.user.number;
        const buyThis = { number , outlet , a , b };
        this.props.buyItems(buyThis);
    };

    render(){
        if(this.props.user.purchase){
            return <Redirect to={`/dashboard/${this.props.user._id}`} />
        }else{
            return(
                <div id="purchase-form" className="white-page">
                    <h1 className="text-center">Purchase</h1>
    
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="outlet">Outlet</label>
                            <select onChange={this.handleChange} defaultValue="" className="form-control" id="outlet" name="outlet" required>
                                <option value="" disabled>Select Your Current Outlet</option>
                                <option value="avenue">Avenue Pharmacy</option>
                                <option value="live">Live Pharmacy</option>
                                <option value="day">Day Pharmacy</option>
                                <option value="pro">Pro Pharmacy</option>
                            </select>
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="a">Product A : </label>
                            <input required onChange={this.handleChange} value={this.state.a} className="form-control" type="number" id="a" name="a" max={6-this.state.b} min="0" />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="b">Product B : </label>
                            <input required onChange={this.handleChange} value={this.state.b} className="form-control" type="number" id="b" name="b" max={6-this.state.a} min="0" />
                        </div>
                        <div>
                            <p><small>**( Product A + Product B must be = 6 )**</small></p>
                        </div>
    
                        <div className="text-center">
                            <input type="submit" value="Proceed" className="btn btn-light bg-light form-control mt-3" />
                        </div>
                    </form>
    
                    {this.props.error.showError ? (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <button onClick={()=>{this.props.clearError()}} type="button" data-dismiss="alert" className="close" aria-label="Close">
                                <span>&times;</span>
                            </button>
                            <strong>{this.props.error.msg}</strong>
                        </div>   
                    ) : null}
                </div>
            );
        }
    };
};

const mapStateToProps = state => {
    return {
        error : state.error,
        user : state.member
    };
};

const mapDispatchToProps = dispatch => {
    return {
        buyItems : items=>dispatch(buyItems(items)),
        clearError : ()=>dispatch(clearError())
    };
};


export default connect(mapStateToProps , mapDispatchToProps)(Purchase);