import app, { start } from './middlewares/express.js';
import { dbConnect } from './middlewares/objection.js';

start()
dbConnect()

export default app