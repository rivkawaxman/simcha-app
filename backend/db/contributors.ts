import knex from './knex';
import * as Moment from 'moment';
import { Contributor, Deposit, History } from '../../frontend/src/Simcha';

function getAll(userId:number) {
    return knex.select().table('contributors').where('contributors.user_id', '=',userId);
}

function add(contributor: Contributor, userId:number) {
    return knex('contributors').insert(
        {
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            cellNumber: contributor.cellNumber,
            dateCreated: Moment(contributor.dateCreated).format('YYYY-MM-DD'),
            alwaysInclude: contributor.alwaysInclude,
            currentBalance: contributor.currentBalance,
            user_id: userId
        }
    );
}

function remove(id: number) {
    return knex('contributions').where('contributor_id', id).del().then(() => {
        return knex('contributors').where('id', id).del();
    });
}

function edit(contributor: Contributor) {
    return knex('contributors').where('id', contributor.id).update(
        {
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            cellNumber: contributor.cellNumber,
            dateCreated: Moment(contributor.dateCreated).format('YYYY-MM-DD'),
            alwaysInclude: contributor.alwaysInclude,
            currentBalance: contributor.currentBalance
        });
}

function updateBalance(id: number, amount: number) {
    return knex('contributors').where('id', id).update({ currentBalance: amount });
}

function getCurrentBAlance(id: number) {
    return knex('contributors').where('id', id).select('currentBalance');
}

function deposit(deposit: Deposit) {
    return knex('deposits').insert(
        {
            contributor_id: deposit.contributor.id,
            amount: deposit.amount,
            date: Moment(deposit.date).format('YYYY-MM-DD')
        });
}

function history(id: number) {
    return knex.select(knex.raw('"Contribution" as type'), 'contributions.amount', 'simchas.name', 'contributions.date')
        .from('contributors')
        .join('contributions', 'contributors.id', 'contributions.contributor_id')
        .join('simchas', 'contributions.simcha_id', 'simchas.id')
        .where('contributors.id', id).union(
            knex.select(knex.raw('"Deposit" as type'), 'deposits.amount', knex.raw('"" as name'), 'deposits.date')
                .from('contributors')
                .join('deposits', 'contributors.id', 'deposits.contributor_id')
                .where('contributors.id', id)
        )
        .orderBy('date', 'desc').then((result) =>{
           let history:History[] = result.map(r => {
               return{
                   type: r.type,
                   amount: r.amount,
                   simcha: r.name,
                   date: r.date
               }
           });
           return history;
        });

}

function total(userId:number) {
    return knex('contributors').sum('currentBalance as total').where('contributors.user_id', '=',userId).then((result) => {
        let total: number = result[0].total;
        return total;
    });
}

function contributorCount(userId:number):number{
    return knex('contributors').count().where('contributors.user_id', '=',userId).then((result) => {
        let total: number = result[0]['count(*)'];
        return total;
    });
}

export {
    getAll,
    add,
    remove,
    edit,
    updateBalance,
    getCurrentBAlance,
    deposit,
    history,
    total,
    contributorCount
}