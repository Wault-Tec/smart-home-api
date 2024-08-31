import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '../config/index.js';
import router from '../router/index.js';
import errorHandler from '../middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

export const start = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`Server started on PORT ${config.port}`);
        })
    } catch (e) {
        console.error(`Error : ${e}`);
    }
}

export default app;
