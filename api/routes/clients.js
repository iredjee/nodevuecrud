'use strict';

const express = require('express');
const router = new express.Router();
const Client = require('../models/client');

/**
 * Create
 */
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    let client = new Client(data);
    await client.save();
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
  try {
    let id = req.params.id;
    let data = req.body;
    let options = { new: true };
    let client = await Client.findByIdAndUpdate(id, { $set: data }, options);
    if (client) {
      res.status(200).send(client);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
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
