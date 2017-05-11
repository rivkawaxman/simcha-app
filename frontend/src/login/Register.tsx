import * as React from 'react';
import Input from '../Input';
import axios from 'axios';
import { RegisterState } from './interfaces';

export default class Register extends React.Component<any, RegisterState> {

    constructor() {
        super();
        this.state = {
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            confirmPassword: '',
            userNameError: false,
            passwordError: false,
            confirmPasswordError: false,
            emailError: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let error = false;
        if (this.state.user.password !== this.state.confirmPassword) {
            error = true;
            this.setState({ confirmPasswordError: true });
        }
        else {
            this.setState({ confirmPasswordError: false });
        }
        if (!this.validateEmail(this.state.user.email)) {
            error = true;
            this.setState({ emailError: true });
        }
        else {
            this.setState({ emailError: false });
        }
        if (this.state.user.password.length < 8 || this.state.user.password.search(/[0-9]/i) < 0) {
            error = true;
            this.setState({ passwordError: true });
        }
        else {
            this.setState({ passwordError: false });
        }

        await axios.post('/api/user/check', { username: this.state.user.username })

            .then((r) => {
                console.log(r);
                if (r.data === "ok") {
                    this.setState({ userNameError: false });
                }
                else {
                    error = true;
                    this.setState({ userNameError: true });
                }
            });
        if (!error) {
            await axios.post('/api/user/createUser', {user:this.state.user});
        }
    }

    handleChange(event) {
        if (event.target.name !== "confirmPassword") {
            let user = this.state.user;
            user[event.target.name] = event.target.value;
            this.setState({ user });
        }
        else {
            this.setState({ confirmPassword: event.target.value });
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render() {
        return (
            <div>
                <div className="row register-box">
                    <span className="col-md-3"> </span>
                    <div className="simchas-header col-md-6">
                        <div className="row">
                            <div className="pink-box col-md-4"><i className="fa fa-gift"></i></div>
                            <div className="col-md-8">
                                <h2 className="register-title">Register for <span className="logo pink"> Simcha Fund</span></h2>


                                {/*<div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8 line"></div>
                                    <div className="col-md-2"></div>
                                </div>*/}
                                <div>

                                    <form onSubmit={(e) => { this.handleSubmit(e) }}>
                                        <div className="col-md-6">
                                            <h4 className="register-title">Personal Info</h4>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="firstName"
                                                    value={this.state.user.firstName}
                                                    placeholder="First Name"
                                                    onChange={this.handleChange} />
                                            </div>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="lastName"
                                                    value={this.state.user.lastName} placeholder="Last Name"
                                                    onChange={this.handleChange} />
                                            </div>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="email"
                                                    required={true}
                                                    value={this.state.user.email}
                                                    placeholder="Email"
                                                    onChange={this.handleChange}
                                                    error={this.state.emailError}
                                                    errorMessage={"Please privide a valid email address"} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="register-title">User Info</h4>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    name="username"
                                                    required={true}
                                                    value={this.state.user.username}
                                                    placeholder="Username"
                                                    onChange={this.handleChange}
                                                    error={this.state.userNameError}
                                                    errorMessage={"Username already exists"} />
                                            </div>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    value={this.state.user.password ? this.state.user.password : ''}
                                                    placeholder="Password"
                                                    onChange={this.handleChange}
                                                    error={this.state.passwordError}
                                                    errorMessage={"Password must be at least 8 charachters and include a number"} />
                                            </div>
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={this.state.confirmPassword}
                                                    placeholder="Confirm Password"
                                                    onChange={this.handleChange}
                                                    error={this.state.confirmPasswordError}
                                                    errorMessage={"Passwords must match"} />
                                            </div>
                                        </div>
                                        <div className="register-btn">
                                            <button type="submit" className="btn pink ">Register</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <span className="col-md-3"> </span>
                </div>
            </div>
        )
    }
}