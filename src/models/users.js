import { Model } from 'objection';

export default class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {type: 'string'},
                password: {type: 'string'},
                isActivated: {type: 'boolean'},
                activationLink: {type: 'string'}
            }
        }
    }
}