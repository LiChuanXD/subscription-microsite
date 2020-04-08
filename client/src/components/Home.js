import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="select-page">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb row">
                    <li className="breadcrumb-item active" aria-current="page">
                        Home
                    </li>
                </ol>
            </nav>

            <div className="select-box text-center">
                <Link className="d-block" to="/admin">ADMIN</Link>
            </div>

            <div className="select-box text-center">
                <Link className="d-block" to="/select">OUTLETS</Link>
            </div>
        </div>
    )
    
};

export default Home;