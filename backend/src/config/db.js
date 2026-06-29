const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Configure connection pool options for resilience under load
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE, 10) || 50, // default 50
      minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE, 10) || 5, // default 5
      serverSelectionTimeoutMS: 5000, // fail fast if DB is unreachable
      socketTimeoutMS: 45000, // allow longer running queries
      waitQueueTimeoutMS: 10000, // limit wait time for connection acquisition
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
