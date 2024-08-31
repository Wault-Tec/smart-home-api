import { Model } from 'objection';
import Room from "./room.js";

export default class House extends Model {
    static get tableName() {
        return 'houses'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'},
            }
        }
    }

    static get relationMappings() {
		return {
			rooms: {
				relation: Model.HasManyRelation,
				modelClass: Room,
				join: {
					from: 'houses.id',
					to: 'rooms.house_id',
				},
			}
		};
	}
}