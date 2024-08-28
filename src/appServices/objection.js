import Knex from 'knex';
import { Model } from 'objection';
import config from '../config/index.js';

export const dbConnect = async () => {
    // const knex = Knex({
    //     client: config.db.client,
    //     connection: {
    //         host: config.db.host,
    //         user: config.db.user,
    //         password: config.db.password,
    //         database: config.db.database,
    //     }
    // });

    const knex = Knex({
        client: "mysql",
        connection: {
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
        }
    });

    Model.knex(knex);
}