import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHendler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRouter from './routes/notesRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(
  cors({
    methods: ['GET', 'POST', 'PATH', 'DELETE'],
    origin: '*',
  }),
);

app.use(express.json());
app.use(logger);

app.use(notesRouter);

app.use(notFoundHandler);
app.use(errorHendler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
