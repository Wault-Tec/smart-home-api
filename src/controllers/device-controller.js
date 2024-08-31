import DeviceService from '../service/device-service.js';
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class DeviceController {
    async create(req, res, next) {
        try {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('All fields must be fill', errors.array()));
          }
          const { name, type } = req.body;
          
          const deviceData = await DeviceService.create(name, type);

          return res.json(deviceData);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('All fields must be fill', errors.array()));
          }
          const { name } = req.body;
          const { id } = req.params;
          const deviceData = await DeviceService.update(name, id);

          return res.json(deviceData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
          const { id } = req.params;
          const deviceData = await DeviceService.delete(id);

          return res.json(deviceData);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
      try {
        const devices = await DeviceService.getAll(req.pagination);
        res.json(devices);
      } catch (e) {
          next(e);
      }
    }

    async getAllUnattached(req, res, next) {
      try {
        const devices = await DeviceService.getAllUnattached();
        res.json(devices);
      } catch (e) {
          next(e);
      }
    }

    async getById(req, res, next) {
      try {
        const { id } = req.params;
        const deviceData = await DeviceService.getById(id);

        return res.json(deviceData);
      } catch (e) {
          next(e);
      }
    }

    async attachDevice(req, res, next) {
      try {
        const { id } = req.params;
        const { house_id, room_id, room_name } = req.body;

        const device = await DeviceService.attachDevice(
          id, 
          house_id, 
          room_id, 
          room_name
        );
        res.json(device);
      } catch (e) {
          next(e);
      }
    }

    async detachDevice(req, res, next) {
      try {
        const { id } = req.params;
        const device = await DeviceService.detachDevice(id);
        res.json(device);
      } catch (e) {
          next(e);
      }
    }

    async updateDeviceInfo(req, res, next) {
      try {
        const { id } = req.params;
        const { enabled, active, warning, temperature} = req.body;
        const device = await DeviceService.updateDeviceInfo(
          id, 
          enabled, 
          active, 
          warning, 
          temperature
        );
        res.json(device);
      } catch (e) {
          next(e);
      }
    }

    async getFiltredDevices(req, res, next) {
      try {
        const { unattached, enabled, type} = req.body;
        const device = await DeviceService.getFiltredDevices(
          unattached, 
          enabled, 
          type
        );
        res.json(device);
      } catch (e) {
          next(e);
      }
    }
    
}

export default new DeviceController();