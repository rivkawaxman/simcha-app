import * as React from 'react';
import Input from '../Input';
//import axios from 'axios';
import { Alert } from 'react-bootstrap';
//import * as Token from './Token';
import { ForgotPasswordState } from './interfaces';
import {Link} from 'react-router-dom';


export default class Login extends React.Component<any, ForgotPasswordState> {

    constructor() {
        super();
        this.state = {
            username: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
       
    }


    handleChange(event) {

            let username = this.state.username;
            username = event.target.value;
            this.setState({ username });
       
    }

    handleAlertDismiss() {
        this.setState({ error: '' });
    }

    renderAlert() {
        if (this.state.error != '') {
            return (
                <div className="row">
                    <div className="col-md-3"></div>
                    <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} className="col-md-6">
                        <i className="fa fa-exclamation-triangle fa-lg"></i> {this.state.error}
                    </Alert>
                    <div className="col-md-3"></div>
                </div>
            )
        }
        else {
            return <div> </div>
        }
    }

    render() {
        return (
            <div>
                {this.renderAlert()}
                <div className="row register-box">
                    <span className="col-md-4"> </span>
                    <div className="simchas-header col-md-4">
                        <div className="row">
                            <div className="pink-box col-md-6"><i className="fa fa-gift"></i></div>
                            <div className="col-md-6">
                                <h2 className="register-title"> <div className="logo pink"> Simcha Fund</div></h2>

                                <div>

                                    <form onSubmit={(e) => { this.handleSubmit(e) }}>

                                        <div className="col-md-12">
                                             <p>Enter you username and we will send you an email with a link to change your password.</p>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="username"
                                                    required={true}
                                                    value={this.state.username}
                                                    placeholder="Username"
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                       <Link to={''}>Forgot your username?</Link>
                                        <div className="login-btn">
                                            <button type="submit" className="btn pink ">Send</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <span className="col-md-4"> </span>
                </div>
            </div>
        )
    }
}
