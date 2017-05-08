import knex from './knex';

function getAll() {
    return knex.select('simchas.id', 'simchas.name', 'simchas.date', knex.raw('sum(contributions.amount) as total'))
        .from('simchas')
        .leftJoin('contributions', 'simchas.id', 'contributions.simcha_id').groupBy('simchas.id')

}

function add(name, date) {
    return knex('simchas').insert({ name: name, date: date });
}

function remove(id) {
    return knex('contributions').where('simcha_id', id).del().then(() => {
        return knex('simchas').where('id', id).del();
    });
        
}

function edit(id, fields) {
    return knex('simchas').where('id', id).update(fields);
}

function getContributions(id) {
    return knex('contributors')
        .join('contributions', 'contributors.id', '=', 'contributions.contributor_id')
        .select('contributions.id', 'contributors.firstName', 'contributors.lastName', 'contributions.contributor_id', 'contributions.amount')
        .where('contributions.simcha_id', id);
}

function addContributions(contributions) {
    return knex('contributions').insert(contributions);
}

export {
    getAll,
    add,
    remove,
    edit,
    getContributions,
    addContributions
}