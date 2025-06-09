import request from 'supertest';
import app from '../src/server';

describe('Policy API', () => {
    it('should get policy by ID', async () => {
        const response = await request(app).get('/policies/pol_003');
        expect(response.status).toBe(200);
    })
    it('should get policies by customer name', async () => {
        const response = await request(app).get('/policies?customerName/manjesh');
        expect(response.status).toBe(200);
        expect(Array.isArray)
    })
    it('should create policy with API key', async () => {
        const response = await request(app).post('/policies').set('x-api-key', process.env.API_KEY || 'test').send({
            "productId": "prod_motor",
            "customerName": "manjesh-test",
            "startDate": "2025-01-01",
            "endDate": "2026-01-01",
            "premium": 890,
            "status": "active"
        });
        expect(response.status).toBe(200);
    })
})