import Device from '../models/device.js';
import House from '../models/house.js';
import Room from '../models/room.js';
import ApiError from '../exceptions/api-error.js';
import RoomService from './room-service.js';
import createParamsInfo from "../utils/createParams.js";

class DeviceService {
    async create(name, type) {
      const device = await Device.query().insert({name, type});
      return device;
    }

    async update(name, id) {
      const deviceById = await Device.query().findById(id);
      if(!deviceById) {
        throw ApiError.BadRequest('Invalid device id');
      }

      const device = await Device.query().patch({name}).where({id});
      return device;
    }

    async delete(id) {
      const deviceById = await Device.query().findById(id);
      if(!deviceById) {
        throw ApiError.BadRequest('Invalid device id');
      }

      const device = await Device.query().delete().where({id});
      return device;
    }

    async getAll(pagination) {
      const devices = await Device.query();

      if(pagination) {
        const filtredDevices = pagination.getFiltredData(devices)
        return filtredDevices;
      }

      return devices
    }

    async getAllUnattached() {
      const devices = await Device.query().where('room_id', null);
      return devices;
    }

    async getFiltredDevices(unattached, enabled, type) {
      const newParams = createParamsInfo(
          {enabled}, 
          {type}
      );

      if(unattached === true) {
        newParams["room_id"] = null;
      };
      console.log('newParams', newParams)
      const devices = await Device.query().where(newParams);
      return devices;
    }

    async getById(id) {
      const device = await Device.query().findById(id);
      if(!device) {
        throw ApiError.BadRequest('Invalid device id');
      }
      return device;
    }

    async attachDevice(
      id, 
      house_id, 
      room_id, 
      room_name
    ) {
      if(!room_id && !room_name) {
        throw ApiError
          .BadRequest('One of the fields "room_id" or "room_name" must be filled in');
      }

      const deviceById = await Device.query().findById(id);
      if(!deviceById) {
        throw ApiError.BadRequest('Invalid device id');
      }

      const houseByID = await House.query().findById(house_id);
      if (!houseByID) {
        throw ApiError.BadRequest('Invalid house id');
      }

      if(room_id) {
        const room = await Room.query().findById(room_id);
        if(!room) {
          throw ApiError.BadRequest('Invalid room id');
        }

        if(room.house_id !== house_id) {
          throw ApiError.BadRequest('Invalid house id');
        }

        const device = await Device.query().patchAndFetchById(id, {
          house_id,
          room_id,
        });
        return device;
      } else {
        const createdRoom = await RoomService.create(room_name, house_id);

        const device = await Device.query().patchAndFetchById(id, {
          house_id,
          room_id: createdRoom.id
        });

        return {
          device,
          createdRoom
        }
      }
    }

    async detachDevice(id) {
      const deviceById = await Device.query().findById(id);
      if(!deviceById) {
        throw ApiError.BadRequest('Invalid device id');
      }

      const device = await Device.query().patchAndFetchById(id, {
        house_id: null,
        room_id: null,
      });
      return device;
    }

    async updateDeviceInfo(
      id, 
      enabled, 
      active, 
      warning, 
      temperature
    ) {
      const deviceById = await Device.query().findById(id);
      if(!deviceById) {
        throw ApiError.BadRequest('Invalid device id');
      }

      const newParams = createParamsInfo(
          {enabled}, 
          {active}, 
          {warning},
          {temperature}
      )

      const device = await Device.query().patchAndFetchById(id, newParams);
      return device;
    }
}

export default new DeviceService();