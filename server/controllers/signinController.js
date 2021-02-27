'use strict'
/*
 * This handle the rest API endpoint: post /signin. This signs users in
 * users. It receives a json object containing email and password then
 * checks if that mathces what is in the database. If it does it
 * returns the contents of the high_scores table: id, user_handle, high_score,
 * rank
 */

const bcrypt = require('bcrypt')
const asyncMiddleware = require('../utils/asyncMiddleware')
const getSigninData = require('../model/getSigninData')
const getProfile = require('../model/getProfile')
const { Client } = require('pg')
const { validateEmail, validatePassword } = require('../common/validation')

const signinController = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body

  if (!validateEmail(email) || !validatePassword(password)) {
    return res.json('Invalid user credentials')
  }

  const client = new Client()
  await client.connect()

  const signinData = await getSigninData(client, email)

  if (signinData.rowCount === 0) {
    client.end()
    return res.json('Invalid user credentials')
  } else {
    const { id, password_hash } = signinData.rows[0]
    const match = await bcrypt.compare(password, password_hash)
    if (match) {
      const data = await getProfile(client, id)
      client.end()
      return res.json(data)
    } else {
      client.end()
      return res.json('Invalid user credentials')
    }
  }
})

module.exports = signinController
