const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const Routes = require('./src/routes/index');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, './src/uploads')));
app.use('/api', Routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
