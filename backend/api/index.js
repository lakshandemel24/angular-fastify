import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMongo from '@fastify/mongodb';

// Create the Fastify instance
const fastify = Fastify({ logger: true });

// Enable CORS
await fastify.register(cors, {
    origin: true, // Allow all origins (Vercel + local dev)
});

// MongoDB (use Vercel env var)
await fastify.register(fastifyMongo, {
    forceClose: true,
    url: process.env.MONGODB_URI, // Defined in Vercel environment variables
});

// --- Routes --- //

// Hello route
fastify.get('/api/hello', async () => {
    return {
        message: 'Hello from Fastify on Laks Vercel!',
        timestamp: new Date().toISOString(),
    };
});

// Get users
fastify.get('/api/users', async function () {
    const users = this.mongo.client.db('myapp').collection('users');
    try {
        return await users.find({}).sort({ createdAt: -1 }).toArray();
    } catch (err) {
        return { error: err.message };
    }
});


// Add user
fastify.post('/api/users', async function (request) {
    const { name } = request.body;
    const users = this.mongo.client.db('myapp').collection('users');
    const newUser = { name, createdAt: new Date() };
    await users.insertOne(newUser);
    return { success: true, user: newUser };
});

// Delete user
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

    return { success: true };
});

// --- Export serverless handler --- //
export default async function handler(req, res) {
    await fastify.ready();
    fastify.server.emit('request', req, res);
}
