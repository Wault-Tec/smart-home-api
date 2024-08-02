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

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.query().findOne({user_id});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return refreshToken.save();
        }
        const token = await Token.query().insert({user_id, refreshToken});
        return token
    }
}

export default new TokenService();