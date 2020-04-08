import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect , Link } from 'react-router-dom'
import { registerUser , clearError } from '../redux/actions/actions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            number : ""
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
        this.props.registerUser(this.state);
    };

    render(){
        if(this.props.user.auth){
            return <Redirect to={`/dashboard/${this.props.user._id}`} />
        }else{
            return(
                <div className="white-page">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb row">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>

                            <li className="breadcrumb-item">
                                <Link to="/select">Select</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/user">User</Link>
                            </li>

                            <li className="breadcrumb-item active" aria-current="page">
                                Register
                            </li>
                        </ol>
                    </nav>

                    <h1 className="mb-5 text-center">Register as new Member</h1>
                    <form className="mt-5" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Enter your Name</label>
                            <input required className="form-control text-center" type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="number">Enter your Phone Number</label>
                            {this.props.error.showError ? (
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <button onClick={()=>{this.props.clearError()}} type="button" data-dismiss="alert" className="close" aria-label="Close">
                                        <span>&times;</span>
                                    </button>
                                    <strong>{this.props.error.msg}</strong>
                                </div>
                            ) : (null)}
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
        user : state.member,
        error : state.error
    };
};

const mapDispatchToProps = dispatch => {
    return{
        registerUser : user=>dispatch(registerUser(user)),
        clearError : ()=>dispatch(clearError())
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(Register);