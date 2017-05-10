
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('simchas', (t) => {
        t.integer('user_id').unsigned();
        t.foreign('user_id').references('users.id');
    }).alterTable('contributors', (t) => {
        t.integer('user_id').unsigned();
        t.foreign('user_id').references('users.id');
    });

};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('simchas', (t) => {
        t.dropForeign('user_id');
        t.dropColumn('user_id');
    }).alterTable('contributors', (t) => {
        t.dropForeign('user_id');
        t.dropColumn('user_id');
    });
};
