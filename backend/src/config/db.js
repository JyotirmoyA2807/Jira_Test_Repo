const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Configure connection pool size and options for high concurrency
    const poolSize = process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE, 10) : 20;
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: poolSize,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Use unified topology for better pool management
      useUnifiedTopology: true,
      // Other recommended options
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected (pool size: ${poolSize})`);
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
