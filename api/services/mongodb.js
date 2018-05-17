'use strict';

const mongoose = require('mongoose');

module.exports = () => {
  // MongoDB connection settings
  mongoose.connect(process.env.MONGODB_URL);

  // MongoDB connection OK
  mongoose.connection.on('connected', () => {
    console.log('Mongodb connection success');
  });

  // MongoDB connection failed
  mongoose.connection.on('error', () => {
    console.log('Mongodb connection failed');
  });
};
