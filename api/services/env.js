'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Env Service
 */
const env = {
  // Load env variables from file
  // It doesn't overwrite existing env variables
  load() {
    try {
      // Default NODE_ENV is dev
      process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
      
      // Read config file and fulfill env variables
      let configPath = path.resolve(__dirname, `../config/${process.env.NODE_ENV}.json`);
      let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      for (let key in config) {
        process.env[key] = process.env[key] || config[key];
      }
    } catch (error) {
      // If function is running locally or on server then env config file required
      throw new Error('Env configuration file not found');
    }
  }
};

module.exports = env;
