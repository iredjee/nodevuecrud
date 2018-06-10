'use strict';

const express = require('express');
const middleware = require('swagger-express-middleware');
const path = require('path');
const app = express();
const logger = require('./services/logger');

middleware(path.join(__dirname, 'swagger.yml'), app, (err, middleware) => {
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );

  app.listen(process.env.PORT || 3003, () => logger.info('The Swagger Server is now running at http://localhost:3003'));
});
