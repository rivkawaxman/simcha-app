import React from 'react'
import Contributor from './Contributor'

export default function ContributorTable(props) {


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


function createTable(props) {
    let contributors = props.contributors;
    if (contributors) {
        return (
            <tbody>
                {contributors.map(c => 
                <Contributor 
                    key={c.id} 
                    onClickDelete={props.deleteContributor.bind(this, c.id)} 
                    onClickEdit={props.editContributor.bind(this)}
                    onClickDeposit={props.deposit.bind(this)}
                    {...c} />)}
            </tbody>
        );
    }

}