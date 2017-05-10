import * as React from 'react';
import SimchaGroup from './SimchaGroup';
import { SimchaTableProps } from './interfaces';
// import Simcha from './Simcha'
// import SimchaContributors from './SimchaContributors'

export default function SimchaTable(props: SimchaTableProps) {


    return (
        <div>
            <table className="table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Total Contributions</th>
                        <th className='action-col'>Action</th>
                    </tr>
                </thead>
                {
                    props.simchas.map(
                        simcha =>
                            <SimchaGroup key={simcha.id} simcha={simcha} deleteSimcha={props.deleteSimcha} updateSimchas={props.updateSimchas} />
                    )

                }

            </table>
        </div>
    )

}

