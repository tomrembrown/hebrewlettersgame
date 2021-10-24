# Hebrew Letters Game

This is a game to test how well you know the letters of the Hebrew alphabet.

It uses the lerna monorepo. The front-end uses React to be a Single Page Application. The back-end is a simple REST API using Node & express, and
accessing a PostgreSQL database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

1. Ensure node, postgresql and yarn are installed. Since lerna is built on yarn, this uses yarn as the package manager. Node must be at least version 14

2. Clone GIT repository and download

```
git clone https://github.com/tomrembrown/hebrewlettersgame.git hebrewalphabetgame
cd hebrewalphabetgame
```

3. Download and install packages in various directories, and copy files to create .env

```
yarn initial
```

4. Determine port postgres runs on

```
linux:  sudo netstat -plunt |grep postgres
or in psql terminal type \conninfo (after psql -U postgres)
```

5. Build PostgreSQL initial database, create user, and give user permissions

```
su - postgres (enter postgres user password)
psql --port (port determined for postgresql server)
OR psql -h localhost(or other host name) -U (user able to create databases) --port (port - if not default 5432)
CREATE DATABASE hebrew_game;
CREATE ROLE hg_computer_access WITH ENCRYPTED PASSWORD (enter password here in single quotes);
GRANT ALL PRIVILEGES ON DATABASE hebrew_game TO hg_computer_access;
ALTER ROLE "hg_computer_access" WITH LOGIN;
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
\c hebrew_game
CREATE EXTENSION IF NOT EXISTS citext;
```

6. Adjust parameters in .env as necessary (note .env files exist in root directory as well as database, client, and server)

7. Create the database tables

```
yarn run createTables (from root directory)
```

7. Development - For development mode, start the servers (command from root directory starts both react & express servers). React runs on a default port of localhost:3000

```
yarn run dev
```

7. Production - For production mode, first build the bundles

```
yarn run build
```

7. Production - On the server, run the server using pm2 (process manager) using:

```
yarn run server
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
