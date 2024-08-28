export const up = function(knex) {
  return knex.schema.hasTable('tokens').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('tokens', (table) => {
				table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.text('refreshToken').notNullable();
			});
		}
	});
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('tokens');
};
