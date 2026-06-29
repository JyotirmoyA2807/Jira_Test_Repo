const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50, // Increase pool size for high concurrency
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000, // Fail fast if cannot connect
      socketTimeoutMS: 45000, // Reasonable socket timeout
      family: 4, // Use IPv4
      // Additional options for robust connection management
      // Use unified topology for better pool handling
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    // Monitor pool usage
    mongoose.connection.on('poolReady', () => {
      console.log('MongoDB connection pool is ready');
    });
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
