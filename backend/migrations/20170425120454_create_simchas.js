
exports.up = function (knex, Promise) {
    return knex.schema.createTable('simchas', t => {
        t.increments('id').unsigned().primary();
        t.string('name');
        t.dateTime('date');
    })
};

exports.down = function (knex, Promise) {
 return knex.schema.dropTable('simchas');
};

