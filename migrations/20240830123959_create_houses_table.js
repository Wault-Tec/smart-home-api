export const up = function(knex) {
  return knex.schema.hasTable('houses').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('houses', (table) => {
				table.increments('id').primary();
        table.text('name').notNullable();
			});
		}
	});
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('houses');
};
