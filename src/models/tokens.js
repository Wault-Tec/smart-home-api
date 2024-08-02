import { Model } from 'objection';
import User from "./users.js";

export default class Token extends Model {
    static get tableName() {
        return 'tokens'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'refreshToken'],
            properties: {
                user_id: {type: 'integer'},
                refreshToken:{type: 'string'},
            }
        }
    }

    static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'tokens.user_id',
					to: 'users.id',
				},
			},
		};
	}
}