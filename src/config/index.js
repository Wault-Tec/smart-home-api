import 'dotenv/config';

export default {
    port: process.env.PORT,
    apiUrl: process.env.API_URL,
    clientUrl: process.env.CLIENT_URL,
    db: {
        client: process.env.DB_CLIENT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
		port: process.env.DB_PORT,
    },
    jwt: {
        access_secret: process.env.JWT_ACCESS_SECRET,
        access_expiration: process.env.JWT_ACCESS_EXPIRATION,
		refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD
    }
};