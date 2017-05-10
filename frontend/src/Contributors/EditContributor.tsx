import * as React from 'react';
import { Modal } from 'react-bootstrap'
import * as Moment from 'moment';
import { Contributor } from '../Simcha';
import { EditContributorProps, EditContributorState } from './interfaces';

export default class EditContributor extends React.Component<EditContributorProps, EditContributorState> {

    constructor() {
        super();
        this.state = {
            showModal: false,
            contributor: new Contributor('', '', '', new Date(), false)
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
    }

    componentDidMount() {
        this.setState({ contributor: this.props.contributor });

    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.props.onSubmit(this.state.contributor);
        this.close();
    }

    close() {
        this.setState({ showModal: false });
        // this.setState({
        //     contributor: {
        //         firstName: '',
        //         lastName: '',
        //         cellNumber: '',
        //         currentBalance: '',
        //         dateCreated: '',
        //         alwaysInclude: false
        //     }
        // });
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
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Contributor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>First Name:</span>
                                    <input type="text" name="firstName" className="form-control" value={this.state.contributor.firstName} onChange={(e) => { this.changeField(e) }} />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Last Name:</span>
                                    <input type="text" name="lastName" className="form-control" value={this.state.contributor.lastName} onChange={(e) => { this.changeField(e) }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Cell Number:</span>
                                    <input type="text" name="cellNumber" className="form-control" value={this.state.contributor.cellNumber} onChange={(e) => { this.changeField(e) }} />
                                </div>
                                <div className="form-group col-md-6">
                                    <span>Current Balance:</span>
                                    <input type="text" name="currentBalance" className="form-control" value={this.state.contributor.currentBalance} onChange={(e) => { this.changeField(e) }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Date Created:</span>
                                    <input type="date" name="dateCreated" className="form-control"
                                        value={this.state.contributor.dateCreated === null ? '' : Moment(this.state.contributor.dateCreated).format('YYYY-MM-DD')}
                                        onChange={(e) => { this.changeField(e) }} />
                                </div>
                                <div className="form-group col-md-6 checkbox-group">
                                    <input type="checkbox" name="alwaysInclude"
                                        checked={this.state.contributor.alwaysInclude}
                                        onChange={(e) => { this.changeCheckBox(e) }} />
                                    <span className="checkbox-class">Always Include</span>
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
