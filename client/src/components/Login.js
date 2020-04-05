import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser} from '../redux/actions/actions';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            number : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e){
        this.setState({
            number : e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
        const regex = /\D/g;
        if(regex.test(this.state.number)){
            this.setState({
                ...this.state,
                error : true
            });
        }else{
            this.setState({
                ...this.state,
                error : false
            });
            this.props.loginUser(this.state);
        }
    };

    render(){
        if(this.props.user.auth){
            return <Redirect to={`/dashboard/${this.props.user._id}`} />
        }else{
            return(
                <div className="white-page">
                    <h1 className="mb-5 text-center">Login as Existing Member</h1>
                    <form className="mt-5" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="number">Enter your Phone Number</label>
                            {this.state.error ? <div className="alert alert-danger" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <strong>Please enter Number only</strong>
                            </div> : null}
                            <input required className="form-control text-center" type="text" name="number" id="number" placeholder="Mobile Number" value={this.state.number} onChange={this.handleChange} />
                        </div>
    
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </form>
                </div>
            )
        }
    };
};

const mapStateToProps = state => {
    return{
        user : state.member
    }
};

const mapDispatchToProps = dispatch => {
    return{
        loginUser : user=>dispatch(loginUser(user))
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Login);