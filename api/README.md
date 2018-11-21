# Casino Lobby REST API

## TODO

* offset/limit
* sort?
* More unit tests for services/games
* Use filter query param with patternProperties or use JSON value?
* Swagger
* GraphQL
* Index page with links to Swagger and GraphQL
* API tests

## Dependencies

* Node.js 8.10.0 or higher (8.10.0 LTS version that AWS Lambda uses)
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

## Linting

Uses the ESLint standard style:

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
