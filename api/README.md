# Casino Lobby REST API

## TODO

* Swagger. See [this swagger implementation as example](https://github.com/versioned/versioned-api/blob/master/lib/swagger_util.js)
* GraphQL. See [this graphql implementation as example](https://github.com/versioned/versioned-api/blob/master/app/graphql.js)
* Index page with links to Swagger and GraphQL
* Logging
* Deployment
* We should maybe change the filter query to be a single param with a JSON value? That should work better with Swagger.
* Sort?

## Dependencies

* Node.js 8.10.0 or higher (8.10.0 is the LTS version that AWS Lambda uses)
* yarn

## Install

```
yarn install
```

## Run Development Server

```
yarn dev
```

## Testing

Run `lint`, `test:unit`, and `test:api`:

```
yarn test
```

Run unit tests with a watch:

```
yarn test:unit:watch
```

Running a single test (an API test in this case):

```
yarn test:api --testMatch games --testNamePattern offset
```

## Linting

Uses the tslint standard style:

```
yarn lint
```

## Example API Calls

With httpie:

```
export BASE_URL=http://localhost:3000
```

```
http GET $BASE_URL/v1/games
```

## Resources

* [JSONschema.net - infers JSON Schema from JSON Data](JSONschema.net)
