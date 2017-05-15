import * as React from 'react';
import * as Numeral from 'numeral';
import EditContributor from './EditContributor';
import Deposit from './Deposit';
import ContributorHistory from './ContributorHistory';
import { ContributorProps } from './interfaces';

export default function Contributor(props: ContributorProps) {

    return (
        <tr>
            <td>{'' + props.contributor.firstName + ' ' + props.contributor.lastName}</td>
            <td>
                {props.contributor.cellNumber}
            </td>
            <td>
                {Numeral(props.contributor.currentBalance).format('$0,0.00')}
            </td>
            <td>
                {renderCheck(props.contributor.alwaysInclude)}
            </td>
            <td>
                <i className="fa fa-trash action-icon" onClick={(e) => { prompt(e, props) }}></i>
                <EditContributor
                    contributor={props.contributor}
                    onSubmit={props.onClickEdit}
                    validatePhone={props.validatePhone}
                />
                <Deposit onSubmit={props.onClickDeposit} contributor={props.contributor} />
                <ContributorHistory contributorId={props.contributor.id} />
            </td>
        </tr>

    )

}



function prompt(event, props: ContributorProps) {
    event.preventDefault();
    let yes: boolean = confirm("Are you sure you'd like to delete that contributor?");
    if (yes) {
        props.onClickDelete(props.contributor.id);
    }
}

function renderCheck(isTrue) {
    if (isTrue) {
        return (<i className="fa fa-check-circle"> </i>)
    }
    return '';
}

