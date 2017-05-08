import React from 'react';
import Link from 'react-router/Link';

export default function Home() {
    return (
        <div className="back-image">
            <i className="fa fa-gift gift-back"></i>
            <p className="logo large"> Simcha Fund</p>
            <p className="slogan">An Easy Way to Collaborate with Friends and Family for Simcha Gifts</p>
            <Link to="/simchas" className="btn btn-default btn-lg home-button first">Simchas</Link>
            <Link to="/contributors" className="btn btn-default btn-lg home-button">Contributors</Link>
        </div>
    )
} 