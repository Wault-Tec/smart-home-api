import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import User from "../models/users.js";
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import config from '../config/index.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async getAuthData(user) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async registration(email, password) {
        const isRegistered = await User.query().findOne({email});
        if(isRegistered) {
            throw ApiError.BadRequest(`The email address ${email} is already in use`)
        }
        const hash = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const fullActivationLink = `${config.apiUrl}/api/activate/${activationLink}`;
        
        const user = await User.query().insert({email, password: hash, activationLink});
        await mailService.sendActivationMail(email, fullActivationLink);

        const authData = await this.getAuthData(user);
        return authData;
    }

    async activate(activationLink) {
        const user = await User.query().findOne({activationLink});
        if(!user) {
            throw new ApiError.BadRequest('Invalid activation link')
        }

        await User.query().findById(user.id).patch({isActivated: true});
    }

    async login(email, password) {
        const user = await User.query().findOne({email});

        if(!user) {
            throw ApiError.BadRequest(`The user with this email was not found`)
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if(!verifyPassword) {
            throw ApiError.BadRequest(`Invalid password`)
        }

        const authData = await this.getAuthData(user);
        return authData;
    }

    async logout(refreshToken) {
        const token = tokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenInDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.query().findById(userData.id);

        const authData = await this.getAuthData(user);
        return authData;
    }

    async getAllUsers() {
        const users = await User.query();
        return users;
    }
}

export default new UserService();