import { Model } from 'objection';
import Room from './room.js';
import House from './house.js';

export default class Device extends Model {
    static get tableName() {
        return 'devices'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'type'],
            properties: {
                name: {type: 'string'},
                type:  {type: 'string'},
                house_id: {type: ['integer', 'null']},
                room_id: {type: ['integer', 'null']},
                enabled: {type: 'boolean'},
                active: {type: 'boolean'},
                warning: {type: ['boolean', 'null']},
                temperature: {type: ['integer', 'null']},
            }
        }
    }

    static get relationMappings() {
      return {
        room: {
          relation: Model.BelongsToOneRelation,
          modelClass: Room,
          join: {
            from: 'devices.room_id',
            to: 'rooms.id',
          },
        },
        house: {
          relation: Model.BelongsToOneRelation,
          modelClass: House,
          join: {
            from: 'devices.house_id',
            to: 'house.id',
          },
        },
      };
    }
}