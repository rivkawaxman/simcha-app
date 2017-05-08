
exports.up = function (knex, Promise) {
    return knex.schema.createTable('deposits', t => {
        t.increments('id').unsigned().primary();
        t.integer('contributor_id').unsigned();
        t.foreign('contributor_id').references('contributors.id');
        t.decimal('amount');
        t.dateTime('date');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('deposits');
};
