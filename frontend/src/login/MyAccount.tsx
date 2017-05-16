import * as React from 'react';
import MyAccountField from './MyAccountField';
import axios from 'axios';
import { MyAccountState } from './interfaces';

export default class Register extends React.Component<any, MyAccountState> {

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
            emailError: false,
            showPasswordFields: false

        }

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleSubmitField = this.handleSubmitField.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.showPassword = this.showPassword.bind(this);
    }

    async componentDidMount() {
        let result = await axios.get('/api/user/userInfo');
        this.setState({ user: result.data.user });
    }

    async handleSubmitField() {
        let error = false;
        let oldUsername = await axios.get('/api/user/username');
        if (this.state.user.username != oldUsername.data.username) {
            await axios.post('/api/user/check', { username: this.state.user.username })
                .then((r) => {
                    if (r.data === "ok") {
                        this.setState({ userNameError: false });
                    }
                    else {
                        error = true;
                        this.setState({ userNameError: true });
                    }
                });
        }
        if (!this.validateEmail(this.state.user.email)) {
            error = true;
            this.setState({ emailError: true });
        }
        else {
            this.setState({ emailError: false });
        }
        if (!error) {
            await axios.post('/api/user/editUser', { user: this.state.user });
            let result = await axios.get('/api/user/userInfo');
            this.setState({ user: result.data.user });
        }
        return error;
    }

    async handleChangePassword(){
        await axios.post('/api/user/changePassword', {password: this.state.user.password})
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleChangeUser(event) {

        if (event.target.name !== "confirmPassword") {
            let user = this.state.user;
            user[event.target.name] = event.target.value;
            this.setState({ user });
        }
        else {
            this.setState({ confirmPassword: event.target.value });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <span className="col-md-2"> </span>

                    <div className="col-md-8">
                        <h2 className="logo simchas my-account-title">My Account</h2>
                        <span className="col-md-2"> </span>
                        <div className="col-md-8  simchas-header">

                            <h4 className="register-title">Personal Info</h4>
                            <MyAccountField
                                inputName="firstName"
                                label={"First Name"}
                                value={this.state.user.firstName}
                                onChange={this.handleChangeUser}
                                required={true}
                                handleSubmit={this.handleSubmitField}
                            />
                            <MyAccountField
                                inputName="lastName"
                                label={"Last Name"}
                                value={this.state.user.lastName}
                                onChange={this.handleChangeUser}
                                required={true}
                                handleSubmit={this.handleSubmitField}
                            />
                            <MyAccountField
                                inputName="email"
                                label={"Email"}
                                value={this.state.user.email}
                                error={this.state.emailError}
                                errorMessage={"Please enter a valid email address"}
                                onChange={this.handleChangeUser}
                                required={true}
                                handleSubmit={this.handleSubmitField}
                            />
                            <h4 className="register-title">User Info</h4>
                            <MyAccountField
                                inputName="username"
                                label={"Username"}
                                value={this.state.user.username}
                                onChange={this.handleChangeUser}
                                error={this.state.userNameError}
                                errorMessage={"Username already exists"}
                                required={true}
                                handleSubmit={this.handleSubmitField}
                            />
                            <MyAccountField
                                inputName="password"
                                label={"Password"}
                                isPassword={true}
                                confirmValue={this.state.confirmPassword}
                                value={this.state.user.password}
                                onChange={this.handleChangeUser}
                                handleSubmit={this.handleSubmitField}
                                handleChangePassword={this.handleChangePassword}

                            />

                        </div>
                        <span className="col-md-2"> </span>
                    </div>
                    <span className="col-md-2"> </span>
                </div>
            </div >
        )
    }
}