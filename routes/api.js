const express = require('express');
const app = express.Router();

const postRoute = require('./post')
const commentRoute = require('./comment')

app.use('/post/', postRoute)
app.use('/comment/', commentRoute)

module.exports = app;
