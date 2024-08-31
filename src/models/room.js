import { Model } from 'objection';

export default class Room extends Model {
    static get tableName() {
        return 'rooms'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'house_id'],
            properties: {
                name: {type: 'string'},
                house_id: {type: 'integer'},
            }
        }
    }
}