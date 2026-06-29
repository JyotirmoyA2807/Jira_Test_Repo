const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Configure connection pool options for high concurrency
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE) : 50, // Increase default pool size
      minPoolSize: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE) : 5,
      serverSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT_MS ? parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT_MS) : 5000,
      socketTimeoutMS: process.env.DB_SOCKET_TIMEOUT_MS ? parseInt(process.env.DB_SOCKET_TIMEOUT_MS) : 45000,
      waitQueueTimeoutMS: process.env.DB_WAIT_QUEUE_TIMEOUT_MS ? parseInt(process.env.DB_WAIT_QUEUE_TIMEOUT_MS) : 10000,
      // Other recommended options for production
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
