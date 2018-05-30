# nodevuecrud
CRUD with Vuejs and Nodejs API

## Requirements
- Nodejs verion 8.9 or higher
- Mongodb running locally on port 27017

## Installation
- Clone the repo to your local machine
- Go to the project directory
- Run `npm install` command

## Configuration
Configuration is based on environment we run our app. Basically there are 3 main environments represented by `NODE_ENV` env variable.

- dev (*default*)
- prod
- test

For each one there should be configuration file named `{NODE_ENV}.json` in `api/config` directory. To create one just copy `api/config/example.json` file and fill with proper values.

For e.g. to run app in `dev` environment with local mongodb installation create the following file:

*api/config/dev.json*
```
{
  "MONGODB_URL": "mongodb://localhost:27017/nodevuecrud"
}
```

## Run
- `npm start` will start app in development mode
- `npm run start:prod` will start app in production mode

Open browser at `http://localhost:3000`

**Note**: Before running app be sure to have appropriate configuration file for dev/prod environment

## Test
- `npm test` for all kind of tests
- `npm run test:api` for api tests
- `npm run test:api:integration` for api integration tests

**Note:** Before running tests be sure to have appropriate configuration file for `test` environment (*api/config/test.json*)

## Clean
- `npm run clean` to clean project from generated files

## API Documentation
HTTP API Endpoints described in **api/swagger.yml** file
- `npm run api:docs`
- Open browser at `http://localhost:4400` to view the documentation
