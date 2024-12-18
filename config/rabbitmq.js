const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

async function createRabbitMQConnection() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    return channel;
}

module.exports = { createRabbitMQConnection };
