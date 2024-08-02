import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import User from "../models/users.js";
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import config from '../config/index.js';

class UserService {
    async registration(email, password) {
        const isRegistered = await User.query().findOne({email});
        if(isRegistered) {
            throw new Error (`Почтовый адрес ${email} уже используется`)
        }
        const hash = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const fullActivationLink = `${config.apiUrl}/api/activate/${activationLink}`;
        
        const user = await User.query().insert({email, password: hash, activationLink});
        await mailService.sendActivationMail(email, fullActivationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.query().findOne({activationLink});
        if(!user) {
            throw new Error('Некорректная ссылка активации')
        }
    }
}

export default new UserService();