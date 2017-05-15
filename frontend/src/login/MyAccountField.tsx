import * as React from 'react';
import Input from '../Input';
import { MyAccountFieldProps, MyAccountFieldState } from './interfaces';


export default class MyAccountField extends React.Component<MyAccountFieldProps, MyAccountFieldState>{
    constructor() {
        super();
        this.state = {
            editMode: false
        }
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleClickEdit() {
        this.setState({ editMode: true })
    }

    renderInput() {
        if (this.state.editMode) {
            return (
                <div className="col-md-10">
                    <Input 
                    name={this.props.inputName} 
                    type={"text"} className="form-control" 
                    wrapperClass="col-md-8" 
                    value={this.props.value} 
                    onChange={this.props.onChange}/>
                    <button className="btn col-md-2">Cancel</button>
                    <button className="btn col-md-2 pink">Update</button>
                </div>
            )
        }
        else {
            return (
                <p>
                    {this.props.value}
                    <i className="fa fa-pencil action-icon" onClick={() => { this.handleClickEdit() }}></i>
                </p>
            )
        }
    }

    render() {
        return (
            <div className="form-group">
                <label className="col-md-2">{this.props.label + ":"}</label>
                {this.renderInput()}
            </div>
        )
    }
}