const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const noteRoutes = require('./src/routes/noteRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const status = mongoose.connection.readyState === 1 ? 'ok' : 'disconnected';
  res.json({ status });
});

app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
