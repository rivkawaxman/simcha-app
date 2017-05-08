import React, { Component } from 'react'
import axios from 'axios';
import Numeral from 'numeral';
import NewContributor from "./NewContributor"
import ContributorTable from "./ContributorTable"

export default class Contributors extends Component {

    constructor() {
        super();
        this.state = {
            contributors: [],
            total: 0
        }
        this.addNewContributor = this.addNewContributor.bind(this);
        this.deleteContributor = this.deleteContributor.bind(this);
        this.editContributor = this.editContributor.bind(this);
        this.deposit = this.deposit.bind(this);
    }

    async componentDidMount() {
        let result = await axios.get('/api/contributors/');
        this.setState({ contributors: result.data.contributors });
        this.setState({ total: result.data.total[0].total });
    }

    async addNewContributor(contributor) {
        await axios.post('/api/contributors/add', { contributor });
        let result = await axios.get('/api/contributors/');
        this.setState({ contributors:  result.data.contributors });
    }

    async deleteContributor(id) {
        await axios.post('api/contributors/delete', { id: id });
        let result = await axios.get('/api/contributors/');
        this.setState({ contributors:  result.data.contributors }, () => console.log("here"));
    }

    async editContributor(contributor) {
        await axios.post('/api/contributors/edit', { contributor });
        let result = await axios.get('/api/contributors/');
        this.setState({ contributors:  result.data.contributors});
    }

    async deposit(deposit) {
        await axios.post('/api/contributors/deposit', { deposit: deposit });
        let result = await axios.get('/api/contributors/');
        this.setState({ contributors:  result.data.contributors });
    }


    render() {
        return (
            <div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="simchas-header col-md-8">
                        <h2 className="logo simchas col-md-12">Contributors</h2>
                    </div>
                    <span className="col-md-2"> </span>
                </div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="col-md-8 table-top">
                        <div className="row">
                            <div className="col-md-6"><NewContributor onSubmit={this.addNewContributor} /></div>
                            <div className="col-md-6">
                                <div className="total">{Numeral(this.state.total).format('$0,0.00')}</div>
                            </div>
                        </div>
                    </div>
                    <span className="col-md-2"></span>
                </div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="col-md-8 simcha-table">
                        <ContributorTable
                            contributors={this.state.contributors}
                            deleteContributor={this.deleteContributor}
                            editContributor={this.editContributor}
                            deposit={this.deposit} />
                    </div>
                    <span className="col-md-2"> </span>
                </div>
            </div>
        )
    }

}