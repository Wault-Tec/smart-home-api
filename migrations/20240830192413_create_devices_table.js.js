export const up = function(knex) {
  return knex.schema.hasTable('devices').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('devices', (table) => {
				table.increments('id').primary();
        table.text('name').notNullable();
        table.text('type').notNullable();
				table.integer('house_id').unsigned();
				table.foreign('house_id').references('houses.id');
        table.integer('room_id').unsigned();
				table.foreign('room_id').references('rooms.id');
        table.boolean('enabled').defaultTo(false);
        table.boolean('active').defaultTo(false);
        table.boolean('warning').nullable().defaultTo(null);
        table.integer('temperature').nullable().defaultTo(null);
			});
		}
	});
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('devices');
};
