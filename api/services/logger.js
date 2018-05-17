'use strict';

const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Custom logger format
let customFormat = printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}] ${JSON.stringify(info.message)}`;
});

// Define level depends on environment
let level;
if (process.env.NODE_ENV === 'dev') {
  level = 'debug';
}
if (process.env.NODE_ENV === 'prod') {
  level = 'info';
}
if (process.env.NODE_ENV === 'test') {
  level = 'error';
}

/**
 * Logger
 */
const logger = winston.createLogger({
  level,
  format: combine(timestamp(), customFormat),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
