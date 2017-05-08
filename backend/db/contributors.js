import knex from './knex';

function getAll() {
    return knex.select().table('contributors');
}

function add(contributor){
    return knex('contributors').insert(
        {
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            cellNumber: contributor.cellNumber,
            dateCreated: contributor.dateCreated,
            alwaysInclude: contributor.alwaysInclude,
            currentBalance: contributor.currentBalance
        }
    );
}

function remove(id) {
    return knex('contributions').where('contributor_id', id).del().then(() => {
        return knex('contributors').where('id', id).del();
    });
}

function edit(contributor) {
    return knex('contributors').where('id', contributor.id).update(
        {
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            cellNumber: contributor.cellNumber,
            dateCreated: contributor.dateCreated,
            alwaysInclude: contributor.alwaysInclude,
            currentBalance: contributor.currentBalance
        });
}

function updateBalance(id, amount) {
    return knex('contributors').where('id', id).update({ currentBalance: amount });
}

function getCurrentBAlance(id) {
    return knex('contributors').where('id', id).select('currentBalance');
}

function deposit(deposit) {
    return knex('deposits').insert(deposit);
}

function history(id) {
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
        .orderBy('date', 'desc');
        
}

function total() {
    return knex('contributors').sum('currentBalance as total');
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
    total
}