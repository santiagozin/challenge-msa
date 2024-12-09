import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import { ElectionModel } from '../src/models/Elections';

describe('Election API Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ElectionModel.deleteMany({});
  });

  describe('POST /api/results', () => {
    it('debería crear una nueva elección', async () => {
      const testData = {
        totalSeats: 10,
        listValues: {
          "1": { value: 100 },
          "2": { value: 200 },
          "3": { value: 300 }
        }
      };

      const response = await request(app)
        .post('/api/results')
        .send(testData)
        .expect(201);

      expect(response.body.mensaje).toBe('Elección creada exitosamente');
      expect(response.body.eleccion).toBeDefined();
      expect(response.body.resultadosDHondt).toBeDefined();
    });

    it('debería devolver error 400 si faltan datos requeridos', async () => {
      const testData = {
        totalSeats: 10
      };

      const response = await request(app)
        .post('/api/results')
        .send(testData)
        .expect(400);

      expect(response.body.mensaje).toBe('Los valores de las listas y el total de escaños son requeridos');
    });
  });

  describe('GET /api/lists', () => {
    it('debería obtener la lista de partidos', async () => {
      const response = await request(app)
        .get('/api/lists')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});