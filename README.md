# hutchison-animals

Hutchison Animals is a simple Animal management application.

It has a ReactJS UI for users to manage their lists of Animals, groups and breeds.

The backend service is a simple Crystal application making use of the Kemal framework.

The data is persisted in a SQLite3 database.

## Installation

### For development

Install `Docker` and `Docker compose`

Create .env file in project root:
```
DB_PATH=./db/hutchison_animals_dev.db
```

### For production

```
docker-compose up build
```

## Usage

### For development

Visit

```
http://localhost:3000
```

### For production

Visit

TODO: Add production URL

## Development

Start the application within the docker container:

```
docker-compose up app
```

## Testing

Execute the following command

```
docker-compose up test
```

## Contributors

- [Paul Cockrell](https://github.com/paulcockrell) - creator and maintainer
