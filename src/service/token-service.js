import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import Token from '../models/tokens.js';

class TokenService {
    generateTokens(payload) {
        const accessToken  = jwt.sign(
            payload, 
            config.jwt.access_secret, 
            {
                expiresIn: config.jwt.access_expiration
            }
        );

        const refreshToken  = jwt.sign(
            payload, 
            config.jwt.refresh_secret, 
            {
                expiresIn: config.jwt.refresh_expiration
            }
        );

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, config.jwt.access_secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.jwt.refresh_secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.query().findOne({user_id});
        if(tokenData) {
            const updatedToken = await Token.query()
                .patch({refreshToken}).where({user_id})

            return updatedToken;
        }
        const token = await Token.query().insert({user_id, refreshToken});
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.query().delete().where({refreshToken});
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.query().findOne({refreshToken});
        return tokenData
    }
}

export default new TokenService();