import * as React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand logo small" href="#"><i className="fa fa-gift gift-icon"></i>Simcha Fund</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className={isActive('/')}><Link to="/">Home <span className="sr-only">(current)</span></Link></li>
                        <li className={isActive('/simchas')}><Link to="/simchas">Simchas</Link></li>
                        <li className={isActive('/contributors')}><Link to="/contributors">Contributors</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

function isActive(path) {
    if (location.pathname === path) {
        return "active";
    }
    return '';
}