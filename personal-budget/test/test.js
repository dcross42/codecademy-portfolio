const {assert} = require('chai');
const {jsdom} = require('jsdom');
const request = require('supertest');
const {editEnvelope,
    insertNewEnvelope,
    getEnvelope} = require('../db/db');

const app = require('../index');

describe('Envelopes', () => {
    describe('POST request', () => {
        it('tests a POST req with an Envelope', async () => {
            const envelope = {
                category: 'Food',
                budget: 150
            };

            const response = await request(app).post('/envelopes').type('form').send(envelope);

            assert.equal(response.status, 201);
        });
    });
});