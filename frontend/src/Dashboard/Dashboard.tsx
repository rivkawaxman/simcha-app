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
            <div>
                <div className="row">
                    <div className="col-md-2"> </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8 heading-box">
                                <span className="heading row">
                                    <div className="avatar col-md-3">
                                        <i className="fa fa-gift"></i>
                                    </div>
                                    <div className="user col-md-9">{this.state.username}
                                    </div>
                                </span>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="small-boxes row">
                            <div className=" box col-md-5">
                                <div className="number">{this.state.totalContributors}</div>
                                <div>Contributors</div>
                            </div>
                            <div className="col-md-2 space-between">
                            </div>
                            <div className=" box col-md-5">
                                <div className="currency">{Numeral(this.state.balance).format('$0,0.00')}</div> <div>in total</div>

                            </div>
                        </div>

                        <div className="row">
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


                    <div className="col-md-2"> </div>
                </div>

            </div>
        )
    }
}