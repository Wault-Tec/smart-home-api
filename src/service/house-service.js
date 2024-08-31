import House from '../models/house.js';
import ApiError from '../exceptions/api-error.js';

class HouseService {
    async create(name) {
      const house = await House.query().insert({name});
      return house;
    }

    async update(name, id) {
      const houseById = await House.query().findById(id);
      if(!houseById) {
        throw ApiError.BadRequest('Invalid house id')
      }

      const house = await House.query().patch({name}).where({id})
      return house;
    }

    async delete(id) {
      const houseById = await House.query().findById(id);
      if(!houseById) {
        throw ApiError.BadRequest('Invalid house id')
      }

      const house = await House.query().delete().where({id})
      return house;
    }

    async getAll() {
      const houses = await House.query();
      return houses;
    }

    async getById(id) {
      const house = await House.query().findById(id);
      if(!house) {
        throw ApiError.BadRequest('Invalid house id')
      }
      return house
    }
}

export default new HouseService();