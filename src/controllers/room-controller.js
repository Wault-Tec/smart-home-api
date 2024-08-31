import RoomService from '../service/room-service.js';
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class RoomController {
    async create(req, res, next) {
        try {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('All fields must be fill', errors.array()));
          }
          const { name, house_id } = req.body;
          
          const roomData = await RoomService.create(name, Number(house_id));

          return res.json(roomData);
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
          const roomData = await RoomService.update(name, id);

          return res.json(roomData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
          const { id } = req.params;
          const roomData = await RoomService.delete(id);

          return res.json(roomData);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
      try {
        const rooms = await RoomService.getAll();
        res.json(rooms);
      } catch (e) {
          next(e);
      }
    }

    async getById(req, res, next) {
      try {
        const { id } = req.params;
        const roomData = await RoomService.getById(id);

        return res.json(roomData);
      } catch (e) {
          next(e);
      }
    }

    async getAllByHouseId(req, res, next) {
      try {
        const { house_id } = req.params;
        const rooms = await RoomService.getAllByHouseId(house_id);
        res.json(rooms);
      } catch (e) {
          next(e);
      }
    }
}

export default new RoomController();