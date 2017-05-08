
exports.up = function (knex, Promise) {
    return knex.schema.createTable('contributions', t => {
        t.increments('id').unsigned().primary();
        t.integer('contributor_id').unsigned();
        t.foreign('contributor_id').references('contributors.id');
        t.integer('simcha_id').unsigned();
        t.foreign('simcha_id').references('simchas.id');
        t.decimal('amount');
        t.dateTime('date');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('contributions');
};
