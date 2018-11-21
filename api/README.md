# Casino Lobby REST API

## TODO

* Add ajv, use req.query schema with filter param
* Ramda - need it?

## Dependencies

* Node.js 8.10.0 (LTS version that AWS Lambda uses)
* yarn

## Install

```
yarn install
```

## Run Development Server

```
yarn dev
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
