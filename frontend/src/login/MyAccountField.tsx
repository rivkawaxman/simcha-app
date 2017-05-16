import * as React from 'react';
import Input from '../Input';
import { MyAccountFieldProps, MyAccountFieldState } from './interfaces';


export default class MyAccountField extends React.Component<MyAccountFieldProps, MyAccountFieldState>{
    constructor() {
        super();
        this.state = {
            editMode: false,
            passWordError: false,
            confirmPasswordError: false
        }
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        let error = await this.props.handleSubmit();
        if (!error) {
            this.setState({ editMode: false })
        }
    }

    handleSubmitPassword(e) {
        e.preventDefault();
        let error = false;

        if (this.props.value != this.props.confirmValue) {
            this.setState({ confirmPasswordError: true })
            error = true;
        }
        else {
            this.setState({ confirmPasswordError: false })
            error = false;
        }
        if (this.props.value.length < 8 || this.props.value.search(/[0-9]/i) < 0) {
            error = true;
            this.setState({ passWordError: true });
        }
        else {
            this.setState({ passWordError: false });
            error = false;
        }
        this.props.handleChangePassword ? this.props.handleChangePassword() : console.log('error');
        this.setState({ editMode: false })
    }

    handleClickEdit() {
        this.setState({ editMode: true })
    }

    handleClickCancel() {
        this.setState({ editMode: false })
    }

    renderInput() {
        if (this.state.editMode) {
            if (!this.props.isPassword) {
                return (
                    <div className="col-md-10 field-group">
                        <form onSubmit={(e) => { this.handleSubmit(e) }}>
                            <Input
                                name={this.props.inputName}
                                type={"text"} 
                                className="form-control my-account-field"
                                error={this.props.error}
                                errorMessage={this.props.errorMessage}
                                wrapperClass="col-md-8"
                                value={this.props.value}
                                required={this.props.required}
                                onChange={this.props.onChange} />
                            <button className="btn " onClick={() => { this.handleClickCancel() }}>Cancel</button>
                            <button type="submit" className="btn  pink">Update</button>
                        </form>
                    </div>
                )
            }
            else {
                return (
                    <div className="col-md-10 field-group">
                        <form onSubmit={(e) => { this.handleSubmitPassword(e) }}>
                            <div>
                                <Input
                                    name={"password"}
                                    placeholder={"Password"}
                                    type={"password"}
                                    className="form-control my-account-field"
                                    error={this.state.passWordError}
                                    errorMessage={"Password must be at least 8 charachters and include a number"}
                                    wrapperClass="col-md-12 password-field"
                                    value={this.props.value}
                                    required={this.props.required}
                                    onChange={this.props.onChange} />
                            </div>
                            <div>
                                <Input
                                    name={"confirmPassword"}
                                    placeholder={"Confrim Password"}
                                    type={"password"}
                                    className="form-control my-account-field"
                                    error={this.state.confirmPasswordError}
                                    errorMessage={"Passwords must match"}
                                    wrapperClass="col-md-12 password-field"
                                    value={this.props.confirmValue}
                                    required={this.props.required}
                                    onChange={this.props.onChange} />
                            </div>
                            <div className="password-buttons">
                                <button className="btn  " onClick={() => { this.handleClickCancel() }}>Cancel</button>
                                <button type="submit" className="btn pink">Update</button>
                            </div>
                        </form>
                    </div>
                )

            }
        }

        else {
            if (this.props.isPassword) {
                return (
                    <button className="btn pink " onClick={() => { this.handleClickEdit() }}>Change</button>
                )
            }
            else {
                return (
                    <p className="my-account-info">
                        {this.props.value}
                        <i className="fa fa-pencil action-icon" onClick={() => { this.handleClickEdit() }}></i>
                    </p>
                )
            }
        }
    }

    render() {
        return (
            <div className="form-group my-account-group">
                <label className="col-md-2">{this.props.label + ":"}</label>
                {this.renderInput()}
            </div>
        )
    }
}