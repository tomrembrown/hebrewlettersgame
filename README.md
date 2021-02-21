# Hebrew Letters Game

This is a game to test how well you know the letters of the Hebrew alphabet.

It uses the lerna monorepo. The front-end uses React to be a Single Page Application. The back-end is a simple REST API using Node & express, and
accessing a PostgreSQL database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Clone GIT repository and download

```
git clone https://github.com/tomrembrown/hebrewlettersgame.git
```

Ensure node, postgresql and yarn are installed. Since lerna is built on yarn, this uses yarn as the package manager.

Download and installs packages in package.json files for both front end and back end using yarn

```
npm install
```

Create environment file in server directory (copy either .env_prod or .env_dev)

```
cd server
cp .env_development .env
```

Determine port postgres runs on

```
linux:  sudo netstat -plunt |grep postgres
or in psql terminal type \conninfo
```

Build PostgreSQL initial database, create user, and give user permissions

```
su - postgres (enter postgres user password)
psql --port (port determined for postgresql server)
CREATE DATABASE hebrew_game;
CREATE ROLE hg_computer_access WITH ENCRYPTED PASSWORD (enter password here);
GRANT ALL PRIVILEGES ON DATABASE hebrew_game TO hg_computer_access;
ALTER ROLE "hg_computer_access" WITH LOGIN;
CREATE EXTENSION IF NOT EXISTS citext;
```

Adjust parameters in .env as necessary (such as postgres port and hg_computer_access password)

Create the database tables

```
yarn run createTables
```

If using existing data, upload the latest data set

```
npm run uploadLatest
```

Increase the number of watches allowed for nodemon to work properly

```
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

For development mode, start the server

```
npm run dev
```

In development mode, run webpack-dev server in browser at localhost:8080

For production mode, first build the bundles

```
npm run build
```

In production mode, run the node-express server at localhost:3000

```
npm run prod
```

## Running the tests

Tests are not currently configured

### What the tests do

These tests handle linting with jshint, link checking, and some cross-page and unit tests.

## Built With

- [Node.JS](https://nodejs.org/) - JavaScript runtime that allows server-side JavaScript
- [Express](https://expressjs.com/) - Backend framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React](https://reactjs.org/) - Frontend framework

## Contributing

Please ask Tom Brown (tom@tomrembrown.com) if you would like to contribute to this project.

## Authors

- **Tom Brown**

## License

This project is using the MIT license - see the [LICENSE](LICENSE) file for details
