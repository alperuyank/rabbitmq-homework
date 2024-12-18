const { createRabbitMQConnection } = require('../config/rabbitmq');

const PAYMENT_QUEUE = 'paymentQueue';

async function makePayment() {
    const paymentPayload = {
        user: 'ali@gmail.com',
        paymentType: 'credit',
        cardNo: '1234123412341234'
    };
    
    const channel = await createRabbitMQConnection();
    await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    channel.sendToQueue(PAYMENT_QUEUE, Buffer.from(JSON.stringify(paymentPayload)), { persistent: true });

    console.log('Payment Sent to Queue:', paymentPayload);
    await channel.close();
}

module.exports = makePayment;
