const makePayment = require('./producers/makePayment');
const processPayment = require('./consumers/processPayment');
const notificationService = require('./consumers/notificationService');

(async function main() {
    console.log('Payment System is Starting...\n');

    try {
        // Send payment to queue (Producer)
        await makePayment();

        // Process Payment (Consumer)
        processPayment();

        // Send notification (Consumer)
        notificationService();

        console.log('\nAll services have been started. The RabbitMQ queue is now listening...');
        
    } catch (error) {
        console.error('An error occurred:', error.message);
        process.exit(1);
    }
})();
