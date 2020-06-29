require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://local-user:${process.env.DB_PASSWORD}@cluster0-udqmy.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true });

app.use(express.json());

const services = require('./services/index');

app.use(services);

module.exports = app;
