'use strict';

const express = require('express');
const joi = require('joi');
const router = new express.Router();
const Provider = require('../models/provider');

/**
 * Create
 */
router.post('/', async (req, res) => {
  // Validation
  const schema = joi.object().keys({
    name: joi.string().required()
  });
  let { error, value:data } = joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    let existedProvider = await Provider.findOne({ email: data.name });
    if (existedProvider) {
      return res.status(409).send({ message: 'Name already exists' });
    }
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
  // Validation
  const schema = joi.object().keys({
    name: joi.string().required()
  });
  let { error, value:data } = joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    let id = req.params.id;
    let provider = await Provider.findByIdAndUpdate(id, { $set: data }, { new: true });
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
