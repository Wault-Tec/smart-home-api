export const up = function(knex) {
  return knex.schema.hasTable('rooms').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('rooms', (table) => {
				table.increments('id').primary();
        table.integer('house_id').unsigned();
        table.foreign('house_id').references('houses.id').onDelete('CASCADE');
        table.text('name').notNullable();
			});
		}
	});
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('rooms');
};
