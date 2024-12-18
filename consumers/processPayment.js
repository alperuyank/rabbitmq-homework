const { createRabbitMQConnection } = require('../config/rabbitmq');

const PAYMENT_QUEUE = 'paymentQueue';
const NOTIFICATION_QUEUE = 'notificationQueue';

async function processPayment() {
    const channel = await createRabbitMQConnection();

    await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    console.log('Listening to Payment Queue...');

    channel.consume(PAYMENT_QUEUE, (msg) => {
        if (msg) {
            const payment = JSON.parse(msg.content.toString());
            let status = ""; 

            if (payment.cardNo.length !== 16) {
                console.log('Invalid card number');
                status = 'fail'; 
            } else {
                status = 'success'; 
            }

            console.log('Payment Received:', payment);

            const notificationPayload = {
                user: payment.user,
                message: 'Your payment has been processed successfully.',
                status: status
            };

            channel.sendToQueue(NOTIFICATION_QUEUE, Buffer.from(JSON.stringify(notificationPayload)), { persistent: true });
            console.log('Notification Sent to Queue:', notificationPayload);

            channel.ack(msg);
        }
    });
}

module.exports = processPayment;
