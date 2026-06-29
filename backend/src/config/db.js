const mongoose = require('mongoose');

let isConnectedBefore = false;

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 20, // Limit pool size to prevent exhaustion
    serverSelectionTimeoutMS: 5000, // Fail fast if cannot connect
    socketTimeoutMS: 45000,
  };

  mongoose.connection.on('connected', () => {
    isConnectedBefore = true;
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    if (!isConnectedBefore) {
      setTimeout(() => connectDB(), 2000);
    }
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });

  try {
    await mongoose.connect(mongoUri, options);
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    // Do not exit immediately; allow retry
    setTimeout(() => connectDB(), 2000);
  }
}

module.exports = connectDB;
