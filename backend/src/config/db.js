const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Set up connection pool options for stability under load
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Limit max connections to avoid pool exhaustion
      maxPoolSize: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE) : 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('MongoDB connected');

    // Listen for connection errors and log them
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Listen for pool exhaustion warnings
    mongoose.connection.on('timeout', () => {
      console.warn('MongoDB connection timeout: possible pool exhaustion');
    });
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
