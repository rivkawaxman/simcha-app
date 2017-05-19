import * as React from 'react'
import axios from 'axios';
import NewSimcha from "./NewSimcha";
import { Simcha } from "../Simcha";
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
        this.updateSimchas = this.updateSimchas.bind(this);
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

    async updateSimchas() {
        let result = await axios.get('/api/simchas/');
        this.setState({ simchas: result.data });
    }

    renderSimchas() {
        if (this.state.simchas.length > 0) {
            return (
                <div className="col-md-8 col-sm-10  col-sm-offset-1 simcha-table col-md-offset-2 ">
                            <SimchaTable simchas={this.state.simchas} deleteSimcha={this.deleteSimcha} updateSimchas={this.updateSimchas} />
                        </div>
               
            )
        }
        else {
            return (
               <div>
                   </div>
            )
        }

    }

    render() {
        return (
             <div className="simchas-container">
                    <div className="row">
                        <div className="simchas-header col-sm-10  col-sm-offset-1 col-md-8 col-md-offset-2">
                            <h2 className="logo simchas col-md-12">Simchas</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 table-top col-sm-10  col-sm-offset-1 col-md-offset-2">
                            <NewSimcha onSubmit={this.addNewSimcha} />
                        </div>
                    </div>
                    <div className="row">
                        {this.renderSimchas()}
                    </div>
                </div>
        )
    }

}