import * as React from 'react';
import axios from 'axios';
import * as Numeral from 'numeral';
import {SimchaContributionsProps, SimchaContributionsState} from './interfaces';
import AddContributions from './AddContributions';

export default class SimchaContributors extends React.Component<SimchaContributionsProps, SimchaContributionsState> {

    constructor() {
        super();
        this.state = {
            contributions: []
        }
        this.addContributor= this.addContributor.bind(this);
    }

    async componentDidMount() {
        let result = await axios.post('/api/simchas/contributions', { id: this.props.simcha.id });
        this.setState({ contributions: result.data });
    }

    async addContributor(){
        let result = await axios.post('/api/simchas/contributions', { id: this.props.simcha.id });
        this.setState({ contributions: result.data });
        this.props.updateSimchas();
    }


    render() {
        return (
            <tr>
                <td> </td>
                <td colSpan={3}>
                    <div className="row">
                      
                        <h4 className="details-title col-md-4">  <i className="fa fa-gift"></i>Contributions</h4>
                        <AddContributions contributions={this.state.contributions} simcha={this.props.simcha} onAdd={this.addContributor}/>
                    </div>
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>
                                        Amount Contributed
                            </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contributions.map(
                                    c =>
                                        <tr key={c.id}>
                                            <td>{c.contributor.firstName} {c.contributor.lastName}</td>
                                            <td>{Numeral(c.amount).format('$0,0.00')}</td>
                                        </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </td>
                <td> </td>
            </tr>
        )

    }

}