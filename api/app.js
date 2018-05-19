'use strict';

/**
 * Load env variables
 */
require('./services/env').load();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const notFound = require('./middlewares/not-found');
const app = express();

/**
 * Mongodb connection
 */
require('./services/mongodb')();

/**
 * Constants
 */
const API_URL = '/api/v1';

/**
 * App configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

/**
 * App routes
 */
app.use('/', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use(`${API_URL}/clients`, require('./routes/clients'));
app.use(`${API_URL}/providers`, require('./routes/providers'));
app.use(notFound());

module.exports = app;
