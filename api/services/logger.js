'use strict';

const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

// Custom logger format
let customFormat = printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}] ${JSON.stringify(info.message)}`;
});

// Define level depends on environment
let level = 'debug';
let silent = process.env.NODE_ENV === 'test';

/**
 * Logger
 */
const logger = winston.createLogger({
  level,
  silent,
  format: combine(timestamp(), customFormat),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
