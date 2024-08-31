import HouseService from '../service/house-service.js';
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class HouseController {
    async create(req, res, next) {
        try {
          const errors = validationResult(req);
          if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('All fields must be fill', errors.array()));
          }
          const { name } = req.body;
          const houseData = await HouseService.create(name);

          return res.json(houseData);
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
          const houseData = await HouseService.update(name, id);

          return res.json(houseData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
          const { id } = req.params;
          const houseData = await HouseService.delete(id);

          return res.json(houseData);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
      try {
        const houses = await HouseService.getAll();
        res.json(houses);
      } catch (e) {
          next(e);
      }
    }

    async getById(req, res, next) {
      try {
        const { id } = req.params;
        const houseData = await HouseService.getById(id);

        return res.json(houseData);
      } catch (e) {
          next(e);
      }
    }
}

export default new HouseController();