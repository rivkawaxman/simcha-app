import * as React from 'react';
import { SimchaGroupProps, SimchaGroupState } from './interfaces';
import Simcha from './Simcha';
import { Simcha as SimchaType } from '../Simcha';
import SimchaContributions from './SimchaContributions';

export default class SimchaGroup extends React.Component<SimchaGroupProps, SimchaGroupState> {
    constructor() {
        super();
        this.state = {
            showDetails: false,
        }
        this.openDetails = this.openDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.deleteSimcha = this.deleteSimcha.bind(this);
    }

    openDetails() {
        this.setState({ showDetails: true });
    }

    closeDetails() {
        this.setState({ showDetails: false });
    }


    renderDetails(simcha) {
        if (this.state.showDetails) {
            return (
                <SimchaContributions key={simcha.id + 'cont'} simcha={simcha} updateSimchas={this.props.updateSimchas}/>
            )
        }
        return <tr></tr>
    }

    deleteSimcha(){
        this.props.deleteSimcha(this.props.simcha.id);
    }

    renderSimcha(simcha:SimchaType) {
        return (
            <Simcha
                key={simcha.id}
                onClickDelete={this.deleteSimcha}
                onClickOpen={this.openDetails}
                onClickClose={this.closeDetails}
                simcha={simcha}
            />
        )
    }

    render() {
        return (
            <tbody key={this.props.simcha.id + 'group'}>

                {this.renderSimcha(this.props.simcha)}
                {this.renderDetails(this.props.simcha)}

            </tbody>
        )
    }

}