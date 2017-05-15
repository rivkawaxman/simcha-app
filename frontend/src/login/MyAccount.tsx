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
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.showPassword = this.showPassword.bind(this);
    }

    async componentDidMount() {
        let result = await axios.get('/api/user/userInfo');
        this.setState({ user: result.data.user });
    }

    /*async handleSubmit(event) {
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
            await axios.post('/api/user/editUser', { user: this.state.user });
        }
    }

 

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    renderPasswordFields() {
        if (this.state.showPasswordFields) {
            return (
                <form>
                    <label>Password:</label>
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
                    <button type="submit" className="btn pink">Update</button>
                </form>
            )
        }
        else {
            return (
                <div className='form-group'>
                    <label>Password:</label>
                    <div><button className="btn pink" onClick={(e) => { this.showPassword() }}>Change</button></div>
                </div>)
        }
    }

    showPassword() {
        this.setState({ showPasswordFields: true })
    }*/

       handleChangeUser(event) {
        // if (event.target.name !== "confirmPassword") {
            let user = this.state.user;
            user[event.target.name] = event.target.value;
            this.setState({ user });
        // }
        // else {
        //     this.setState({ confirmPassword: event.target.value });
        // }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <span className="col-md-2"> </span>

                    <div className="col-md-8">
                        <h2 className="logo simchas ">My Account</h2>
                        <span className="col-md-2"> </span>
                        <div className="col-md-8  simchas-header">
                            <form >
                            {/*onSubmit={(e) => { this.handleSubmit(e) }}*/}
                            
                                <h4 className="register-title">Personal Info</h4>
                               <MyAccountField  inputName="firstName" label={"First Name"} value={this.state.user.firstName} onChange={this.handleChangeUser}/>
                            </form>
                            {/*{this.renderPasswordFields()}*/}
                        </div>
                        <span className="col-md-2"> </span>
                    </div>
                    <span className="col-md-2"> </span>
                </div>
            </div >
        )
    }
}