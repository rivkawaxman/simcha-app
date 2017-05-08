import React, { Component } from 'react';
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Moment from 'moment'

export default class Deposit extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
           amount:''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
    }

 
    async handleSubmit(event) {
        event.preventDefault();
        //await this.props.onSubmit(this.props.contributorId, this.state.amount);
        await this.props.onSubmit({
            contributor_id : this.props.contributorId,
            amount: this.state.amount,
            date: Moment().format('YYYY,MM,DD')
        })
        this.close();
    }

    close() {
        this.setState({ showModal: false });
       this.setState({amount: ''});
    }

    open() {
        this.setState({ showModal: true });
    }

    changeField(event) {
        let amount = this.state.amount;
        amount = event.target.value;
        this.setState({ amount });
    }



    render() {
        return (
            <span>
                <i className="fa fa-money action-icon" onClick={this.open}></i>
                <Modal bsSize="small" show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Deposit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="form-group">
                                <span>Amount:</span>
                                <input type="text" name="amount" className="form-control" value={this.state.amount} onChange={(e) => { this.changeField(e) }} />
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
