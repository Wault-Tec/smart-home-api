export const up = function(knex) {
  return knex.schema.hasTable('users').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('users', (table) => {
				table.increments('id').primary();
				table.string('email').notNullable();
				table.text('password').notNullable();
				table.boolean('isActivated');
        table.text('activationLink');
			});
		}
	});
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
