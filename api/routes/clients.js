'use strict';

const express = require('express');
const joi = require('joi');
const router = new express.Router();
const Client = require('../models/client');

/**
 * Create
 */
router.post('/', async (req, res) => {
  // Validation
  const schema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().regex(/^[\+]?[0-9]+$/).required(),
    providers: joi.array().items(joi.object())
  });
  let { error, value:data } = joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    let existedClient = await Client.findOne({ email: data.email });
    if (existedClient) {
      return res.status(409).send({ message: 'Email already registered' });
    }
    let client = new Client(data);
    await client.save();
    await Client.populate(client, 'providers');
    res.status(201).send(client);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

/**
 * Read
 */
router.get('/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      let id = req.params.id;
      let client = await Client.findById(id).populate('providers');
      if (client) {
        res.status(200).send(client);
      } else {
        res.status(404).send({ message: 'Not found' });
      }
    } else {
      let data = req.query;
      let clients = await Client.find(data).populate('providers');
      res.status(200).send(clients);
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

/**
 * Update
 */
router.put('/:id', async (req, res) => {
  // Validation
  const schema = joi.object().keys({
    name: joi.string(),
    email: joi.string().email(),
    phone: joi.string().regex(/^[\+]?[0-9]+$/),
    providers: joi.array().items(joi.object())
  });
  let { error, value:data } = joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    let id = req.params.id;
    if (data.email) {
      let existedClient = await Client.findOne({ email: data.email });
      if (existedClient && existedClient.id !== id) {
        return res.status(409).send({ message: 'Email already registered' });
      }
    }
    let client = await Client.findByIdAndUpdate(id, { $set: data }, { new: true });
    await Client.populate(client, 'providers');
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

/**
 * Delete
 */
router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let client = await Client.findByIdAndDelete(id);
    if (client) {
      res.status(200).send(client);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
