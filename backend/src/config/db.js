const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Configure connection pool options for robust handling under load
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50, // Increase pool size for high concurrency
      minPoolSize: 5,  // Maintain a minimum number of connections
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unavailable
      socketTimeoutMS: 10000, // Prevent hanging connections
      family: 4, // Use IPv4
      // Additional options for stability
      waitQueueTimeoutMS: 10000, // Limit wait time for a connection
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Listen for connection errors and log them
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Listen for disconnected events and attempt reconnection
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
