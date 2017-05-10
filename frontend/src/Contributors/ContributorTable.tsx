import * as React from 'react';
import Contributor from './Contributor';
import {ContributorTableProps} from "./interfaces";

export default function ContributorTable(props: ContributorTableProps) {


    return (
        <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cell Phone</th>
                        <th>Balance</th>
                        <th>Always Include</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {createTable(props)}
            </table>
        </div>
    )

}


function createTable(props:ContributorTableProps) {
    let contributors = props.contributors;
    if (contributors) {
        return (
            <tbody>
                {contributors.map(c => 
                <Contributor 
                    key={c.id} 
                    onClickDelete={() => {props.deleteContributor(c.id)}}
                    onClickEdit={() => {props.editContributor(c)}}
                    onClickDeposit={ props.deposit}
                    contributor={c} />)}
            </tbody>
        );
    }
    return <tbody></tbody>;

}