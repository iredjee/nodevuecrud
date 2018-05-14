'use strict';

const express = require('express');
const router = new express.Router();
const Provider = require('../models/provider');

/**
 * Create
 */
router.post('/', async (req, res) => {
  try {
    let data = req.body;
    let provider = new Provider(data);
    await provider.save();
    res.status(201).send(provider);
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
      let provider = await Provider.findById(id);
      if (provider) {
        res.status(200).send(provider);
      } else {
        res.status(404).send({ message: 'Not found' });
      }
    } else {
      let data = req.query;
      let providers = await Provider.find(data);
      res.status(200).send(providers);
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
    let provider = await Provider.findByIdAndUpdate(id, { $set: data }, options);
    if (provider) {
      res.status(200).send(provider);
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
    let provider = await Provider.findByIdAndDelete(id);
    if (provider) {
      res.status(200).send(provider);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
