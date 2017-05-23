
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
      t.string('ticket', 30);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (t) => {
      t.dropColumn('ticket');
  })
};
