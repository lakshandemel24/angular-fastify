const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'), {
    origin: 'http://localhost:4200' // Angular dev server
});

fastify.get('/api/hello', async (request, reply) => {
    return {
        message: 'Hello from Fastify (local dev)!',
        timestamp: new Date().toISOString()
    };
});

fastify.get('/api/users', async (request, reply) => {
    return [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
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

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running at http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();