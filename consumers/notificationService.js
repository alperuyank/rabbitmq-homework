const { createRabbitMQConnection } = require('../config/rabbitmq');

const NOTIFICATION_QUEUE = 'notificationQueue';

async function notificationService() {
    const channel = await createRabbitMQConnection();
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    console.log('Listening to Notification Queue...');

    channel.consume(NOTIFICATION_QUEUE, (msg) => {
        if (msg) {
            const notification = JSON.parse(msg.content.toString());
            console.log(`Sending Notification: ${notification.user} - ${notification.message}`);
            if(notification.status == 'success'){
                console.log('Notification sent successfully.');
                channel.ack(msg);
            } 
            else if (notification.status == 'fail'){
                console.log('An error occurred');
            }
        }

    });
}

module.exports = notificationService;
