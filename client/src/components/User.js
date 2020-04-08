import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
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
                        User
                    </li>
                </ol>
            </nav>

            <div className="select-box">
                <Link to="/user/register" className="d-block">
                    NEW USER
                </Link>
            </div>

            <div className="select-box">
                <Link to="/user/login" className="d-block">
                    EXISTING USER
                </Link>
            </div>
        </div>
    )
};

export default User;