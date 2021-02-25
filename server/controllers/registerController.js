'use strict'
/*
 * This handle the rest API endpoint: post /register. This registers
 * users. It receives a json object containing email, password,
 * and user_handle. It creates this user in both database tables, and then
 * returns the contents of the high_scores table: id, user_handle, high_score,
 * rank (though both high_score and rank are null right now)
 */

const bcrypt = require('bcrypt')
const saltRounds = 10
const asyncMiddleware = require('../utils/asyncMiddleware')
const register = require('../model/register')
const { Client } = require('pg')
const {
  validateUserHandle,
  validateEmail,
  validatePassword,
} = require('../../common/validation')

const registerController = asyncMiddleware(async (req, res) => {
  const { user_handle, email, password } = req.body

  if (
    !validateUserHandle(user_handle) ||
    !validateEmail(email) ||
    !validatePassword(password)
  )
    return res
      .status(400)
      .json(
        'post register requires valid user_handle, email, and password in body'
      )

  const signup_date = new Date()
  const password_hash = await bcrypt.hash(password, saltRounds)
  const client = new Client()
  await client.connect()
  const data = await register(
    client,
    email,
    password_hash,
    signup_date,
    user_handle
  )
  await client.end()
  res.json(data)
})

module.exports = registerController
