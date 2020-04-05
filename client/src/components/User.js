import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    return(
        <div className="select-page">
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