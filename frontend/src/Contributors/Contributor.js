import React from 'react';
import Moment from 'react-moment'
import SweetAlert from 'react-swal';
import Numeral from 'numeral';
import EditContributor from './EditContributor';
import Deposit from './Deposit';
import ContributorHistory from './ContributorHistory';
import axios from 'axios';
import '../node_modules/sweetalert/dist/sweetalert.css';

export default class Contributor extends React.Component {

    constructor() {
        super();
        this.state = {
            showSwal: false
        }
        this.delete = this.delete.bind(this);
        this.prompt = this.prompt.bind(this);
    }

    prompt() {
        this.setState({ showSwal: true });
    }

    delete() {
        this.props.onClickDelete();
    }

    renderCheck(isTrue) {
        if (isTrue) {
            return (<i className="fa fa-check-circle"> </i>)
        }
    }

   

    render() {
        return (
            <tr>
                <SweetAlert isOpen={this.state.showSwal}
                    type="warning"
                    text="Do you really want to delete this contributor?"
                    confirmButtonText="Yup"
                    confirmButtonColor="#f44289"
                    cancelButtonText="Nope"
                    callback={(d) => { if (d) { this.delete() } }} />
                <td>{'' + this.props.firstName + ' ' + this.props.lastName}</td>
                <td>
                    {this.props.cellNumber}
                </td>
                <td>
                    {Numeral(this.props.currentBalance).format('$0,0.00')}
                </td>
                <td>
                    {this.renderCheck(this.props.alwaysInclude)}
                </td>
                <td>
                    <i className="fa fa-trash action-icon" onClick={this.prompt}></i>
                    <EditContributor
                        id={this.props.id}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        cellNumber={this.props.cellNumber}
                        currentBalance={this.props.currentBalance}
                        alwaysInclude={this.props.alwaysInclude}
                        dateCreated={this.props.dateCreated}
                        onSubmit={this.props.onClickEdit}
                    />
                    <Deposit onSubmit={this.props.onClickDeposit} contributorId={this.props.id}/>
                    <ContributorHistory contributorId={this.props.id}/>
                </td>
            </tr>

        )
    }
}
