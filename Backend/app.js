import express from 'express';
import userRoutes from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import posRoute from './routes/posRoute.js';

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoute);

export default app;
