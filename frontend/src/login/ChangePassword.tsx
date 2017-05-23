import * as React from 'react';
import Input from '../Input';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import * as Token from './Token';
import { ChangePasswordState } from './interfaces';


export default class ChangePassword extends React.Component<any, ChangePasswordState> {

    constructor() {
        super();
        this.state = {
            password: '',
            passwordError: false,
            confirmPassword: '',
            confirmError: false,
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

    }

    async handleSubmit(event) {
        event.preventDefault();
        //console.log(this.props.match.params.token);
        let error = false;
        if (this.state.password !== this.state.confirmPassword) {
            error = true;
            this.setState({ confirmError: true });
        }
        else {
            this.setState({ confirmError: false });
        }
        if (this.state.password.length < 8 || this.state.password.search(/[0-9]/i) < 0) {
            error = true;
            this.setState({ passwordError: true });
        }
        else {
            this.setState({ passwordError: false });
        }
        if (!error) {
            await axios.post('/api/user/changePasswordTicket', { ticket: this.props.match.params.ticket, password: this.state.password }).then((r) => {
                if (!r.data.error) {

                    let token: string = r.data.id_token;
                    Token.SaveTokenAsCookie(token);
                    this.props.history.push('/');
                }
                else {
                    this.setState({ error: r.data.error })
                };

            }
            );
        }
    }


    handleChange(event) {
        if (event.target.name === "password") {
            let password = this.state.password;
            password = event.target.value;
            this.setState({ password });
        }
        else {
            let confirmPassword = this.state.confirmPassword;
            confirmPassword = event.target.value;
            this.setState({ confirmPassword });
        }


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
                                <h2 className="register-title">Change Password <div className="logo pink"> Simcha Fund</div></h2>

                                <div>

                                    <form onSubmit={(e) => { this.handleSubmit(e) }}>

                                        <div className="col-md-12">

                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    required={true}
                                                    value={this.state.password}
                                                    placeholder="Password"
                                                    error={this.state.passwordError}
                                                    errorMessage={"Password must be at least 8 charachters and include a number"}
                                                    onChange={this.handleChange} />
                                            </div>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    name="confirmPassword"
                                                    required={true}
                                                    value={this.state.confirmPassword}
                                                    placeholder="Confirm Password"
                                                    error={this.state.confirmError}
                                                    errorMessage="Passwords must match"
                                                    onChange={this.handleChange} />
                                            </div>

                                        </div>

                                        <div className="login-btn">
                                            <button type="submit" className="btn pink ">Update</button>
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
