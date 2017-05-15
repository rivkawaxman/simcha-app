import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as Moment from 'moment';
import { Contributor } from '../Simcha';
import Input from '../Input';
import { NewContributorState, NewContributorProps } from './interfaces';

export default class NewContributor extends React.Component<NewContributorProps, NewContributorState> {

    constructor() {
        super();
        this.state = {
            showModal: false,
            contributor: new Contributor('', '', '', Moment().toDate(), false),
            cellNumberError: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
        this.changeCheckBox = this.changeCheckBox.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.props.validatePhone(this.state.contributor.cellNumber)) {
            this.setState({ cellNumberError: false });
            await this.props.onSubmit(this.state.contributor);
            this.close();
        }
        else {
            this.setState({ cellNumberError: true });
        }
    }

    close() {
        this.setState({ showModal: false });
        this.setState({
            contributor: new Contributor('', '', '', Moment().toDate(), false)
        });
    }

    open() {
        this.setState({ showModal: true });
    }

    changeField(event) {
        let contributor = this.state.contributor;
        contributor[event.target.name] = event.target.value;
        this.setState({ contributor });
    }

    changeCheckBox(event) {
        let contributor = this.state.contributor;
        contributor[event.target.name] = !contributor[event.target.name];
        this.setState({ contributor });
    }

    render() {
        return (
            <div>
                <button className="btn new-simcha pink" onClick={this.open}>New Contributor</button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Contributor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>First Name:</span>
                                    <Input type="text"
                                        required={true}
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.contributor.firstName}
                                        onChange={this.changeField}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Last Name:</span>
                                    <Input type="text"
                                        name="lastName"
                                        required={true}
                                        className="form-control"
                                        value={this.state.contributor.lastName}
                                        onChange={this.changeField} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Cell Number:</span>
                                    <Input type="text"
                                        name="cellNumber"
                                        required={true}
                                        className="form-control"
                                        error={this.state.cellNumberError}
                                        errorMessage={"Please enter a valid phone number"}
                                        value={this.state.contributor.cellNumber}
                                        onChange={this.changeField} />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Initial Deposit:</span>
                                    <Input
                                        type="number"
                                        name="currentBalance"
                                        className="form-control"
                                        value={this.state.contributor.currentBalance}
                                        onChange={this.changeField}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {/*<div className="form-group col-md-6">
                                    <span>Date Created:</span>
                                    <input type="date" name="dateCreated" className="form-control" 
                                    value={this.state.contributor.dateCreated === null ? '' : Moment(this.state.contributor.dateCreated).format('YYYY-MM-DD')} 
                                    onChange={(e) => { this.changeField(e) }} />
                                </div>*/}
                                <div className="form-group col-md-6 checkbox-group">
                                    <label className="control control--checkbox">Always Include
                                    <input
                                            type="checkbox"
                                            name="alwaysInclude"
                                            checked={this.state.contributor.alwaysInclude}
                                            onChange={this.changeCheckBox}
                                        />
                                        <span className="control__indicator"></span>
                                    </label>
                                    {/*<input type="checkbox" name="alwaysInclude" 
                                        checked={this.state.contributor.alwaysInclude}
                                        onChange={(e) => { this.changeCheckBox(e) }} />
                                    <span className="checkbox-class">Always Include</span>*/}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            <button type="submit" className="btn pink">Add</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

