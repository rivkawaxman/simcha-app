import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import * as Numeral from 'numeral';
import * as Moment from 'moment';
import {SimchaContributor, Contributor, Contribution} from '../Simcha';
import {AddContributionProps, AddContributionState} from './interfaces';

export default class AddContributions extends React.Component<AddContributionProps, AddContributionState> {

    constructor() {
        super();
        this.state = {
            showModal: false,
            contributors: []
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let result = await axios.get('/api/contributors');
        let allContributors:Contributor[] = result.data.contributors;
        let contributors:SimchaContributor[] = [];
        let contributions = this.props.contributions;
        for (let c of allContributors) {
            let contributionObj = contributions.find((i) => { return i.contributor.id == c.id });
            if (contributionObj == undefined) {
                let newCont = new SimchaContributor();
                newCont.contributor = c;
                newCont.amountGave = 5.0;
                newCont.give = false;
                contributors.push(newCont);
            }
        }

        this.setState({ contributors });

    }

    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
        
    }

    changeCheckBox(event) {
        let contributors = this.state.contributors;
        contributors[event.target.id].give = !contributors[event.target.id].give;
        this.setState({ contributors });
    }

    changeField(event) {
        let contributors = this.state.contributors;
        contributors[event.target.id][event.target.name] = event.target.value;
        this.setState({ contributors });
    }


    async handleSubmit(event) {
        event.preventDefault();
        let contributors:SimchaContributor[] = [];
        let contributions:Contribution[] = [];
        for (let c of this.state.contributors) {
            if (c.give) {
                let contribution = new Contribution( this.props.simcha, c.contributor, c.amountGave, Moment().toDate());
                contributions.push(contribution);
            }
            else{
                contributors.push(c);
            }
        }
        await axios.post('/api/simchas/addContributions', { contributions: contributions });
        this.close();
        this.setState({contributors});
        this.props.onAdd();
    }

    renderContributors() {
        if (this.state.contributors.length == 0) {
            return (<h5>Everyone contributed!!</h5>)
        }
        else {
            return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Always Include</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contributors.map((c, index) =>
                        <tr key={c.contributor.id}>
                            <td>
                                <label className="control control--checkbox">
                                    <input type="checkbox"
                                        checked={c.give}
                                        id={index.toString()}
                                        onChange={(e) => { this.changeCheckBox(e) }}
                                    />
                                    <span className="control__indicator"></span>
                                </label>
                            </td>
                            <td>{c.contributor.firstName} {c.contributor.lastName}</td>
                            <td><input className="form-control" type="number" value={c.amountGave} name="amountGave" id={index.toString()} onChange={(e) => { this.changeField(e) }} /></td >
                            <td>{Numeral(c.contributor.currentBalance).format('$0,0.00')}</td>
                            <td>{c.contributor.alwaysInclude ? <i className="fa fa-check-circle"></i> : ""}</td>
                        </tr>
                    )}
                </tbody>
            </table>)
        }
    }

    render() {
        return (
            <div className=" col-md-2">
                <button className="btn pink btn-sm add-contribution-btn" onClick={this.open}>Add Contributions</button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Contributions</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.renderContributors()}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            <button type="submit" className="btn pink">Add</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }

}