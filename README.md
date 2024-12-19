presentation: https://drive.google.com/file/d/10LDX22B92oDAEvvoz8umvdbIuuaKakWv/view?usp=sharing
# Payment Processing System with RabbitMQ

This project implements a **three-step payment processing system** using **Node.js** and **RabbitMQ**.
The system ensures reliable message delivery between microservices by using message queues for payment 
processing and notifications.

---

## Architecture Overview

The system has three main steps:

1. **Make Payment (Producer):**
   - Sends payment details to the `Payment Queue`.

2. **Process Payment (Consumer):**
   - Consumes messages from the `Payment Queue`.
   - Processes the payment and sends data to the `Notification Queue`.

3. **Notification Service (Consumer):**
   - Consumes messages from the `Notification Queue`.
   - Simulates sending an email notification to the user.

---

## Technologies Used

- **Node.js**: JavaScript runtime for the services.
- **amqplib**: RabbitMQ client for Node.js.
- **RabbitMQ**: Message broker for queueing messages.

---

## Project Structure

```bash
root/
│
├── config/                     # RabbitMQ configuration
│   └── rabbitmq.js             
│
├── producers/                  # Producers send messages to queues
│   └── makePayment.js
│
├── consumers/                  # Consumers process queue messages
│   ├── processPayment.js
│   └── notificationService.js
│
├── index.js                    # Main entry point for the application
├── package.json                # Project dependencies
└── README.md                   # Documentation

Setup and Installation
1. Prerequisites
Node.js (v14+)
RabbitMQ (Running locally or remotely)


2. Install Dependencies
Clone the repository and install dependencies:

npm install

3. Run the Application
Start all services:

npm start
