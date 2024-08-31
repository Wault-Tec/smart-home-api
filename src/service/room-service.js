import Room from '../models/room.js';
import ApiError from '../exceptions/api-error.js';

class RoomService {
    async create(name, house_id) {
      const room = await Room.query().insert({name, house_id});
      return room;
    }

    async update(name, id) {
      const roomById = await Room.query().findById(id);
      if(!roomById) {
        throw ApiError.BadRequest('Invalid room id')
      }

      const room = await Room.query().patch({name}).where({id})
      return room;
    }

    async delete(id) {
      const roomById = await Room.query().findById(id);
      if(!roomById) {
        throw ApiError.BadRequest('Invalid room id')
      }

      const room = await Room.query().delete().where({id})
      return room;
    }

    async getAll() {
      const rooms = await Room.query();
      return rooms;
    }

    async getById(id) {
      const room = await Room.query().findById(id);
      if(!room) {
        throw ApiError.BadRequest('Invalid room id')
      }
      return room
    }

    async getAllByHouseId(house_id) {
      const rooms = await Room.query().where({house_id});

      if(!rooms.length) {
        throw ApiError.BadRequest('Invalid house id')
      }
      return rooms;
    }
}

export default new RoomService();