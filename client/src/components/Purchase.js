import React , { Component } from 'react';
import { connect } from 'react-redux';
import {buyItems , fetchUser} from '../redux/actions/actions';

class Purchase extends Component {
    constructor(props){
        super(props);
        this.state = {
            outlet : "",
            a : "",
            b : "",
            success : false
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
        const number = this.props.user.number;
        const { outlet , a , b } = this.state;
        const buy = { number , outlet , a , b }
        this.props.buyItems(buy);
        this.props.history.push(`/dashboard/${this.props.user._id}`);
        this.props.fetchUser(this.props.user._id);
    };

    render(){
        const avenueLength = this.props.outlet[0].available;
        const liveLength = this.props.outlet[1].available;
        const dayLength = this.props.outlet[2].available;
        const proLength = this.props.outlet[3].available;

        const aOption = () => {
            if(avenueLength === 0){
                return <option value="avenue" disabled>Avenue Pharmacy (limit reached)</option>
            }else{
                return <option value="avenue">Avenue Pharmacy</option>
            }
        };

        const lOption = () => {
            if(liveLength === 0){
                return <option value="avenue" disabled>Live Pharmacy (limit reached)</option>
            }else{
                return <option value="avenue">Live Pharmacy</option>
            }
        };

        const dOption = () => {
            if(dayLength === 0){
                return <option value="avenue" disabled>Day Pharmacy (limit reached)</option>
            }else{
                return <option value="avenue">Day Pharmacy</option>
            }
        };

        const pOption = () => {
            if(proLength === 0){
                return <option value="avenue" disabled>Pro Pharmacy (limit reached)</option>
            }else{
                return <option value="avenue">Pro Pharmacy</option>
            }
        };


        return(
            <div id="purchase-form" className="white-page">
                <h1 className="text-center">Purchase</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="outlet">Outlet</label>
                        <select onChange={this.handleChange} defaultValue="" className="form-control" id="outlet" name="outlet" required>
                            <option value="" disabled>Select your current Outlet</option>
                            {aOption()}
                            {lOption()}
                            {dOption()}
                            {pOption()}
                        </select>
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="a">Product A : </label>
                        <input required onChange={this.handleChange} value={this.state.a} className="form-control" type="number" id="a" name="a" max={6-this.state.b} min="0" />
                    </div>
    
                    <div className="form-group mb-1">
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
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        user : state.member,
        outlet : state.outlet
    }
}

const mapDispatchToProps = dispatch => {
    return{
        buyItems : items=>dispatch(buyItems(items)),
        fetchUser : param=>dispatch(fetchUser(param))
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Purchase);