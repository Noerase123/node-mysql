const express = require('express');
const app = express.Router();

const postRoute = require('./post')

app.use('/post/', postRoute)

module.exports = app;
