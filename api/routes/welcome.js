'use strict';

const express = require('express');
const router = new express.Router();

/**
 * Welcome
 */
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to API' });
});

module.exports = router;
