import app, { start } from './appServices/express.js';
import { dbConnect } from './appServices/objection.js';

start();
dbConnect();

export default app;