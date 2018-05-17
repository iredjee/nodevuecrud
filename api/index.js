'use strict';

const app = require('./app');

/**
 * App start
 */
let listener = app.listen(process.env.PORT || 3000, () => console.log(`Server is running on ${listener.address().port}`));
