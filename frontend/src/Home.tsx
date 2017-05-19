import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Token from './login/Token';
import Dashboard from './Dashboard/Dashboard';

export default function Home() {
    return (
        <div className="home-container">
            {userOrPublic()}
        </div>
    )
}

function userOrPublic() {
    if (Token.TokenExists()) {
        return (<Dashboard />);
    }
    else {
        return (
            <div className="back-image">
                <i className="fa fa-gift gift-back"></i>
                <p className="logo large"> Simcha Fund</p>
                <p className="slogan">An Easy Way to Collaborate with Friends and Family for Simcha Gifts</p>
                <Link to="/login" className="btn btn-default btn-lg home-button first">Login</Link>
                <Link to="/register" className="btn btn-default btn-lg home-button">Register</Link>
            </div>
        );
    }
}