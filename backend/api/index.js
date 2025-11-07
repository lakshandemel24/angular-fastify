import Fastify from 'fastify';
import cors from '@fastify/cors';

// Create the Fastify instance
const fastify = Fastify({ logger: true });

// Enable CORS
await fastify.register(cors, {
    origin: true, // Allow all origins in development
});

// Define routes
fastify.get('/api/hello', async (request, reply) => {
    return {
        message: 'Hello from Fastify on Laks Vercel!',
        timestamp: new Date().toISOString(),
    };
});

// Export a handler compatible with Vercel’s serverless runtime
export default async function handler(req, res) {
    await fastify.ready();
    fastify.server.emit('request', req, res);
}
