import dotenv from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMongo from '@fastify/mongodb';

dotenv.config(); // Loads .env file

const fastify = Fastify({ logger: true });

// Allow CORS from Angular dev server
await fastify.register(cors, {
    origin: 'http://localhost:4200',
});

// Simple route
fastify.get('/api/hello', async (request, reply) => {
    return {
        message: 'Hello from Fastify (local dev)!',
        timestamp: new Date().toISOString(),
    };
});

// MongoDB connection
await fastify.register(fastifyMongo, {
    forceClose: true,
    url: process.env.MONGODB_URI,
});

// Get all users
fastify.get('/api/users', async function (req, reply) {
    const users = this.mongo.client.db('myapp').collection('users');
    try {
        return await users.find({}).sort({ createdAt: -1 }).toArray();
    } catch (err) {
        return err;
    }
});

// Add a new user
fastify.post('/api/users', async function (request, reply) {
    const { name } = request.body;
    const users = this.mongo.client.db('myapp').collection('users');
    const newUser = { name, createdAt: new Date() };
    await users.insertOne(newUser);
    return { success: true, user: newUser };
});

// Delete a user
fastify.delete('/api/user/:id', async function (request, reply) {
    const { id } = request.params;

    if (!this.mongo.ObjectId.isValid(id)) {
        return reply.code(400).send({ success: false, message: 'Invalid ID format' });
    }

    const users = this.mongo.client.db('myapp').collection('users');
    const result = await users.deleteOne({ _id: new this.mongo.ObjectId(id) });

    if (result.deletedCount === 0) {
        return reply.code(404).send({ success: false, message: 'User not found' });
    }

    return { success: true, user: result };
});

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('✅ Server running at http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
