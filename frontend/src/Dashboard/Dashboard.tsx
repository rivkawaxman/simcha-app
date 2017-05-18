import * as React from 'react';
import { DashboardState } from './interfaces';
import axios from 'axios';
import * as Numeral from 'numeral';
import * as Moment from 'moment';

export default class Dashboard extends React.Component<any, DashboardState>{

    constructor() {
        super();
        this.state = {
            totalContributors: 0,
            balance: 0,
            upcomingSimchas: [],
            username: ''
        }
    }

    async componentDidMount() {
        let results = await axios.get('/api/dashboard');
        this.setState(
            {
                totalContributors: results.data.totalContributors,
                balance: results.data.balance,
                upcomingSimchas: results.data.upcomingSimchas,
                username: results.data.username
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="row">
                        <div className="col-md-12 heading-box">

                            <i className="fa fa-gift avatar"></i>
                            <p className="user">{this.state.username}
                            </p>

                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="small-boxes row">
                        <div className="col-md-6">
                            <div className="box">
                                <div className="number">{this.state.totalContributors}</div>
                                <div>Contributors</div>
                            </div>
                        </div>
                       <div className="col-md-6">
                           <div className="box">
                               <div className="currency">{Numeral(this.state.balance).format('$0,0.00')}</div> <div>in total</div>

                           </div>
                       </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="big-box">
                                <div className="pink title">
                                    Upcoming Simchas
                                    </div>
                                <div className="cards">
                                    {this.state.upcomingSimchas.map((s, index) => {
                                        return (
                                            <div key={index} className="row card">
                                                <div className="col-md-4"> {s.name}</div>
                                                <div className="col-md-4"> <i className="fa fa-calendar"></i>{s.date === null ? '' : Moment(s.date).format('MMMM DD')}</div>
                                                <div className="col-md-4"> <span className="currency">{Numeral(s.totalContributions).format('$0,0.00')}</span> Contributed</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        )
    }
}