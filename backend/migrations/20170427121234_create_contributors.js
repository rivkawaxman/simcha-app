
exports.up = function (knex, Promise) {
    return knex.schema.createTable('contributors', t => {
        t.increments('id').unsigned().primary();
        t.string('firstName');
        t.string('lastName');
         t.string('cellNumber', 10);
        t.dateTime('dateCreated');
        t.boolean('alwaysInclude');
        t.decimal('currentBalance');
    })
};

exports.down = function (knex, Promise) {
 return knex.schema.dropTable('contributors');
};
