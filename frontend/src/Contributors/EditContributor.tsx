import * as React from 'react';
import { Modal } from 'react-bootstrap'
import * as Moment from 'moment';
import Input from '../Input';
import { Contributor } from '../Simcha';
import { EditContributorProps, EditContributorState } from './interfaces';

export default class EditContributor extends React.Component<EditContributorProps, EditContributorState> {

    constructor() {
        super();
        this.state = {
            showModal: false,
            contributor: new Contributor('', '', '', new Date(), false),
            cellNumberError: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
        this.changeCheckBox = this.changeCheckBox.bind(this);
    }

    componentDidMount() {
        this.setState({ contributor: this.props.contributor });

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
        //this.setState({contributor: new Contributor('', '', '', new Date(), false)});
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
            <span>
                <i className="fa fa-pencil action-icon" onClick={this.open}></i>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={(e) => { this.handleSubmit(e) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Contributor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>First Name:</span>
                                    <Input
                                        type="text"
                                        required={true}
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.contributor.firstName}
                                        onChange={this.changeField} />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Last Name:</span>
                                    <Input type="text"
                                        required={true}
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.contributor.lastName}
                                        onChange={this.changeField} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Cell Number:</span>
                                    <Input
                                        type="text"
                                        error={this.state.cellNumberError}
                                        errorMessage={"Please enter a valid phone number"}
                                        name="cellNumber"
                                        className="form-control"
                                        value={this.state.contributor.cellNumber}
                                        onChange={this.changeField}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Current Balance:</span>
                                    <Input type="number"
                                        name="currentBalance"
                                        className="form-control"
                                        value={this.state.contributor.currentBalance}
                                        onChange={this.changeField} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Date Created:</span>
                                    <Input
                                        type="date"
                                        readOnly={true}
                                        name="dateCreated"
                                        className="form-control"
                                        value={this.state.contributor.dateCreated === null ? '' : Moment(this.state.contributor.dateCreated).format('YYYY-MM-DD')}
                                    />
                                </div>
                                <div className="form-group col-md-6 checkbox-group edit">
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
                            <button className="btn" onClick={this.close}>Close</button>
                            <button type="submit" className="btn pink">Submit</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </span>
        )

    }
}
