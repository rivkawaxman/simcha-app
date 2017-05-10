import * as React from 'react';
import * as Moment from 'moment';
import * as Numeral from 'numeral'
//import {Simcha as SimchaType}  from '../../../types/Simcha';
import {SimchaState, SimchaProps} from './interfaces'



export default class Simcha extends React.Component<SimchaProps, SimchaState> {

    constructor() {
        super();
        this.state = {
            detailOpen: false
        }
        this.openDetails = this.openDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.prompt = this.prompt.bind(this);
    }
    prompt() {
        let yes = confirm("Are you sure want to delete that simcha?");
        if(yes){
            this.props.onClickDelete(this.props.simcha.id);
        }
    }


    openDetails() {
        this.setState({ detailOpen: true });
        this.props.onClickOpen();
    }

    closeDetails() {
        this.setState({ detailOpen: false });
        this.props.onClickClose();
    }

    render() {
        return (
            <tr>
                
                {this.renderDetails()}
                <td>{this.props.simcha.name}</td>
                <td>
                    {this.props.simcha.date === null ? '' :
                    Moment(this.props.simcha.date).format("MMMM DD, YYYY")}
                </td>
                <td> {Numeral(this.props.simcha.totalContributions).format('$0,0.00')}</td>
                <td>
                    <i className="fa fa-trash action-icon" onClick={this.prompt}></i>
                </td>
            </tr>
        )
    }

    renderDetails() {
        if (!this.state.detailOpen) {
            return (
                <td className="details-column" onClick={this.openDetails}>
                    <i className="glyphicon glyphicon-chevron-right action-icon"></i>
                </td>
            )
        }

        else {
            return (
                <td className="details-column" onClick={this.closeDetails}>
                    <i className="glyphicon glyphicon-chevron-down action-icon"></i>
                </td>
            )
        }
    }
}
