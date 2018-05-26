'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */
const providerSchema = new Schema({
  name: String
}, {
  versionKey: false,
  timestamps: true
});

/**
 * Indexes
 */
providerSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Provider', providerSchema);
