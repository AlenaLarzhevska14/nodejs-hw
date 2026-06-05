import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(logger);

app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
