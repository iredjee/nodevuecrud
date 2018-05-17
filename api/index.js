'use strict';

const app = require('./app');
const logger = require('./services/logger');

/**
 * App start
 */
let listener = app.listen(process.env.PORT || 3000, () => logger.info(`Server is running on ${listener.address().port}`));
