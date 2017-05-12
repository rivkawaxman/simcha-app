import * as React from 'react';
import Input from '../Input';
import axios from 'axios';
import * as Token from './Token';
import { LoginState } from './interfaces';

export default class Login extends React.Component<any, LoginState> {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.post('/api/user/login', {username:this.state.username, password:this.state.password}).then((r) =>{
               if(r.status === 200){
                   //debugger;
                   let token:string= r.data.id_token;
                   Token.SaveTokenAsCookie(token);
                   this.props.history.push('/');
                   //this.context.router.push('/');
               }
        });
    }


    handleChange(event) {
        if (event.target.name === "username") {
            let username = this.state.username;
            username = event.target.value;
            this.setState({ username });
        }
        else {
            let password = this.state.password;
            password = event.target.value;
            this.setState({ password });
        }
    }

    render() {
        return (
            <div>
                <div className="row register-box">
                    <span className="col-md-4"> </span>
                    <div className="simchas-header col-md-4">
                        <div className="row">
                            <div className="pink-box col-md-6"><i className="fa fa-gift"></i></div>
                            <div className="col-md-6">
                                <h2 className="register-title">Login <div className="logo pink"> Simcha Fund</div></h2>
                                
                                <div>

                                    <form onSubmit={(e) => { this.handleSubmit(e) }}>

                                        <div className="col-md-12">
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
                                            <div className='form-group'>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    value={this.state.password ? this.state.password : ''}
                                                    placeholder="Password"
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="login-btn">
                                            <button type="submit" className="btn pink ">Login</button>
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
