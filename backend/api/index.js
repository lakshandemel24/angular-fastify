const fastify = require('fastify')({ logger: true });

// Enable CORS
fastify.register(require('@fastify/cors'), {
    origin: true // Allow all origins in development
});

// Routes
fastify.get('/api/hello', async (request, reply) => {
    return {
        message: 'Hello from Fastify on Vercel!',
        timestamp: new Date().toISOString()
    };
});

fastify.get('/api/users', async (request, reply) => {
    return [
        { id: 1, name: 'John Doee', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
});

fastify.post('/api/users', async (request, reply) => {
    const user = request.body;
    return {
        success: true,
        user: { ...user, id: Date.now() }
    };
});

// Export handler for Vercel serverless
module.exports = async (req, res) => {
    await fastify.ready();
    fastify.server.emit('request', req, res);
};