const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.error('Connection error', error);
});

app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));

app.use('/api', userRoutes);
app.use('/api', donationRoutes);

app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
