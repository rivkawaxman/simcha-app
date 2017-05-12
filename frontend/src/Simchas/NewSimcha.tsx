import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as Moment from 'moment';
import {Simcha} from '../Simcha';
import {NewSimchaProps, NewSimchaState} from './interfaces';
import Input from '../Input';

export default class NewSimcha extends React.Component<NewSimchaProps, NewSimchaState> {

    constructor() {
        super();
        this.state = {
            showModal: false,
            simcha: new Simcha('', null)
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    async handleSubmit(event){
        event.preventDefault();
        await this.props.onSubmit(this.state.simcha);
        this.close();
       
    }

    close() {
        this.setState({ showModal: false });
         this.setState({simcha: new Simcha('', null)});
    }

    open() {
        this.setState({ showModal: true });
    }

    onChangeName(event){
        
    }

    render() {


        return (
            <div>

                <button className="btn new-simcha pink" onClick={this.open}>New Simcha</button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Simcha</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <span>Name:</span>
                                <Input type="text" name="name" className="form-control" value={this.state.simcha.name} 
                                required={true}
                                onChange={(event) => {this.setState({simcha: new Simcha(event.target.value, this.state.simcha.date)})}}/>
                            </div>
                            <div className="form-group">
                                <span>Date:</span>
                                <Input type="date" name="date" className="form-control" 
                                required={true}
                                value={this.state.simcha.date === null ? '' : Moment(this.state.simcha.date).format('YYYY-MM-DD')} 
                                onChange={(event) => {this.setState({simcha: new Simcha(this.state.simcha.name, new Date(event.target.value))})}}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            <button type="submit" className="btn pink">Add</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

