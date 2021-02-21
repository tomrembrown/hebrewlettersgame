'use strict'
const path = require('path')

const { Pool } = require('pg')
require('dotenv').config({ path: path.join(__dirname, '/.env') }) // load the environment variables from .env

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

module.exports = pool
