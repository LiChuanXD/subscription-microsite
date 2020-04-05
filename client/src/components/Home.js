import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOutlet } from '../redux/actions/actions';

class Home extends Component {
    componentDidMount(){
        this.props.fetchOutlet()
    }
    render(){
        return(
            <div className="select-page">
                <div className="select-box text-center">
                    <Link className="d-block" to="/admin">ADMIN</Link>
                </div>
    
                <div className="select-box text-center">
                    <Link className="d-block" to="/select">OUTLETS</Link>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOutlet : ()=>dispatch(fetchOutlet())
    }
}
export default connect(null , mapDispatchToProps)(Home);