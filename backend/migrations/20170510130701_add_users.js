
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', t => {
        t.increments('id').unsigned().primary();
        t.string('username');
        t.string('password');
        t.string('firstName');
        t.string('lastName');
        t.string('email');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
