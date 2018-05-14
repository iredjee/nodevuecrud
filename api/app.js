'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const app = express();

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
app.use(API_URL, require('./routes/welcome'));
app.use(notFound());

module.exports = app;
