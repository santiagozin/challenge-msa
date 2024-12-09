import express from 'express';
import cors from 'cors';
import conectarDB from './config/database.js';
import electionRoutes from './routes/election.js';
import healthRoutes from './routes/health.js';
import { limiter, logging, errorHandler, notFound } from './middleware';
import helmet from 'helmet';

conectarDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(limiter);
    
app.use(logging);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', electionRoutes);
app.use('/api/health', healthRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;