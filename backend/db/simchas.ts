import knex from './knex';
import * as Moment from 'moment';
import { Contribution, Simcha, Contributor } from '../../frontend/src/Simcha';

function getAll() {
    return knex.select('simchas.id', 'simchas.name', 'simchas.date', knex.raw('sum(contributions.amount) as total'))
        .from('simchas')
        .leftJoin('contributions', 'simchas.id', 'contributions.simcha_id').groupBy('simchas.id').then((results) => {
            let simchas: Simcha[] = results.map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    date: r.date,
                    totalContributions: r.total
                }
            }
            )
            return simchas;
        });

}

function add(simcha: Simcha) {
    return knex('simchas').insert({ name: simcha.name, date: Moment(simcha.date).format('YYYY-MM-DD') });
}

function remove(id: number) {
    return knex('contributions').where('simcha_id', id).del().then(() => {
        return knex('simchas').where('id', id).del();
    });

}

function edit(id: number, simcha: Simcha) {
    return knex('simchas').where('id', id).update(simcha);
}

function getContributions(id: number) {
    return knex('contributors')
        .join('contributions', 'contributors.id', '=', 'contributions.contributor_id')
        .join('simchas', 'contributions.simcha_id', '=', 'simchas.id')
        .select(knex.raw('contributions.id as contributionId, contributions.amount, contributions.date,' +
            'contributors.id as contributorId, contributors.firstName, contributors.lastName, contributors.cellNumber,' +
            'contributors.alwaysInclude, contributors.currentBalance, simchas.id as simchaId, simchas.name, simchas.date as simchaDate'))
        .where('contributions.simcha_id', id).then((results) => {
            let contributions: Contribution[] = results.map(r => {
                return {
                    id: r.contributionId,
                    simcha:
                    {
                        id: r.simchaId,
                        name: r.name,
                        date: r.simchaDate
                    },
                    contributor:
                    {
                        id: r.contributorId,
                        firstName: r.firstName,
                        lastName: r.lastName,
                        cellNumber: r.cellNumber,
                        alwaysInclude: r.alwaysInclude,
                        currentBalance: r.currentBalance
                    },
                    amount: r.amount,
                    date: r.date
                }
            })
            return contributions;
        });
}

function addContributions(contributions: Contribution[]) {
    let x = contributions.map(c => {
        return {
            id: c.id,
            contributor_id: c.contributor.id,
            simcha_id: c.simcha.id,
            amount: c.amount,
            date: Moment(c.date).format('YYYY-MM-DD')
        }
    })
    return knex('contributions').insert(x);
}

function getSimcha(result: any): Simcha {
    return
}

async function getContributor(id: number): Promise<Contributor> {
    return await knex('contributors').where('id', id).then((c) => {
        return new Contributor(c.firstName, c.lastName, c.cellNumber, c.dateCreated, c.alwaysInclude);
    });
}

export {
    getAll,
    add,
    remove,
    edit,
    getContributions,
    addContributions
}