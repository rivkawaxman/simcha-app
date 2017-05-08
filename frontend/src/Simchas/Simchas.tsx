import * as React from 'react'
import axios from 'axios';
import NewSimcha from "./NewSimcha";
import { Simcha } from "../../../types/Simcha";
import { SimchasState } from './interfaces';
import SimchaTable from "./SimchaTable";

export default class Simchas extends React.Component<any, SimchasState> {

    constructor() {
        super();
        this.state = {
            simchas: []
        }
        this.addNewSimcha = this.addNewSimcha.bind(this);
        this.deleteSimcha = this.deleteSimcha.bind(this);
    }

    async componentDidMount() {
        let result = await axios.get('/api/simchas/');
        this.setState({ simchas: result.data });
    }

    async addNewSimcha(simcha: Simcha) {
        await axios.post('/api/simchas/add', { simcha: simcha });
        let result = await axios.get('/api/simchas/');
        this.setState({ simchas: result.data });
    }

    async deleteSimcha(id: number) {
        await axios.post('api/simchas/delete', { id: id });
        let result = await axios.get('/api/simchas/');
        this.setState({ simchas: result.data });
    }


    render() {
        return (
            <div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="simchas-header col-md-8">
                        <h2 className="logo simchas col-md-12">Simchas</h2>
                    </div>
                    <span className="col-md-2"> </span>
                </div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="col-md-8 table-top">
                        <NewSimcha onSubmit={this.addNewSimcha} />
                    </div>
                    <span className="col-md-2"> </span>
                </div>
                <div className="row">
                    <span className="col-md-2"> </span>
                    <div className="col-md-8 simcha-table">
                        <SimchaTable simchas={this.state.simchas} deleteSimcha={this.deleteSimcha} />
                    </div>
                    <span className="col-md-2"> </span>
                </div>
            </div>
        )
    }

}