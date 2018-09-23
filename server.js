'use strict';

require('dotenv').load();
const express = require('express');
const debug = require('debug')('olympics:server');
const mongoose = require('mongoose');

const allRoutes = require('./routes/allRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

// middleware and routes
app.use(allRoutes);

const server = module.exports = app.listen(PORT, () => {
    debug(`olympics app is listening on ${PORT}`);
});

server.isRunning = true;