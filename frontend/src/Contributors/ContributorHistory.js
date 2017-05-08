import React, { Component } from 'react';
import ReactBootstrap, { Modal } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'moment';
import Numeral from 'numeral';

export default class ContributorHistory extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            history: []
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    async componentDidMount() {
        let result = await axios.post('/api/contributors/history', { id: this.props.contributorId });
        let history = result.data;
        this.setState({ history });
        console.log(this.state.history);
    }

    close() {
        this.setState({ showModal: false });

    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <span>
                <i className="fa fa-history action-icon" onClick={this.open}></i>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                     <th>Simcha Name</th>
                                      <th>Amount</th> 
                                      <th>Date</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {this.state.history.map((h, index) => 
                                    <tr key={index}>
                                        <td>{h.type}</td>
                                        <td>{h.name}</td>
                                        <td>{(h.type==="Deposit" ? "+" : "-") + Numeral(h.amount).format('$0,0.00')}</td>
                                        <td>{Moment(h.date).format('MMMM DD, YYYY')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={this.close}>Close</button>
                    </Modal.Footer>

                </Modal>
            </span>
        )
    }
}