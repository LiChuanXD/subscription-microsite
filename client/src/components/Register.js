import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { registerUser } from '../redux/actions/actions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            number : "",
            error : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    handleSubmit(e){
        e.preventDefault();
        const {name , number} = this.state;
        const user = {name , number};
        const regex = /\D/g;
        if(regex.test(number)){
            //got alphabet
            this.setState({
                ...this.state,
                error : true
            });
        }else{
            this.setState({
                ...this.state,
                error : false
            });
            this.props.registerUser(user);
        }
        
    };

    render(){
        if(this.props.user.auth){
            return <Redirect to={`/dashboard/${this.props.user._id}`} />
        }else{
            return(
                <div className="white-page">
                    <h1 className="mb-5 text-center">Register as new Member</h1>
                    <form className="mt-5" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Enter your Name</label>
                            <input required className="form-control text-center" type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </div>
    
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
    
                        <div className="form-check">
                            <input required type="checkbox" className="form-check-input" id="checkbox" />
                            <label htmlFor="checkbox" className="form-check-label">
                                I authorize Abbott to disclose my personal data to selected third parties to deliver value added service for me as an Antlysis Design Club member.
                            </label>
                        </div>
                        
                        <div>
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            )
        }
    };
};

const mapStateToProps = state => {
    return{
        user : state.member
    };
};

const mapDispatchToProps = dispatch => {
    return{
        registerUser : user=>dispatch(registerUser(user))
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Register);