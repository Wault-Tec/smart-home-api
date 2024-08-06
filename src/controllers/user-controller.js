import isEmpty from "../utils/isEmpty.js";
import userService from '../service/user-service.js';
import config from "../config/index.js";

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;

            if (isEmpty(email) || isEmpty(password)) throw new Error('All fields must be fill');

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData);

        } catch (e) {
            await res.json({
                success: false,
                message: e.message || e,
            });
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(config.clientUrl);
        } catch (e) {
            console.error(e)
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (e) {
            
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['ss', '122'])
        } catch (e) {
            
        }
    }
}

export default new UserController()