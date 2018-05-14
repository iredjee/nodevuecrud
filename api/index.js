'use strict';

const app = require('./app');

/**
 * App start
 */
app.listen(process.env.PORT || 3000, () => console.log('Server is running'));
