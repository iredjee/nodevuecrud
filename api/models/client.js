'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Provider = require('./provider');

/**
 * Schema
 */
const clientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  providers: [{ type: Schema.Types.ObjectId, ref: 'Provider' }]
}, {
  versionKey: false,
  timestamps: true
});

/**
 * Indexes
 */
clientSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Client', clientSchema);
