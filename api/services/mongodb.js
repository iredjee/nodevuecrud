'use strict';

const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = () => {
  // MongoDB connection settings
  mongoose.connect(process.env.MONGODB_URL);

  // MongoDB connection OK
  mongoose.connection.on('connected', () => {
    logger.info('Mongodb connection success');
  });

  // MongoDB connection failed
  mongoose.connection.on('error', () => {
    logger.error('Mongodb connection failed');
  });
};
