const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Configure connection pool options for resilience under load
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE) : 20, // default 20
      minPoolSize: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE) : 0,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      // Ensure connections are released promptly
      waitQueueTimeoutMS: 10000,
      // Use unified topology for better pool management
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Listen for pool events for diagnostics
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection open');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection disconnected');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    mongoose.connection.on('close', () => {
      console.log('Mongoose connection closed');
    });
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
