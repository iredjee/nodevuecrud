'use strict';

const mongoose = require('mongoose');

module.exports = () => {
  /**
   * MongoDB connection settings
   */
  mongoose.connect('mongodb://localhost:27017/api');
};
