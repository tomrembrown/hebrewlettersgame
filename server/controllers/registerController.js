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
} = require('../common/validation')
const checkEmailTaken = require('../model/checkEmailTaken')
const checkHandleTaken = require('../model/checkHandleTaken')

const registerController = asyncMiddleware(async (req, res) => {
  const { user_handle, email, password } = req.body

  let errorArray = []
  if (!validateUserHandle(user_handle)) errorArray.push('invalid user_handle')
  if (!validateEmail(email)) errorArray.push('invalid email')
  if (!validatePassword(password)) errorArray.push('invalid password')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = new Client()
  await client.connect()

  const [emailTaken, handleTaken] = await Promise.all([
    checkEmailTaken(client, email),
    checkHandleTaken(client, user_handle),
  ])

  if (emailTaken) errorArray.push('email taken')
  if (handleTaken) errorArray.push('user_handle taken')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    client.end()
    return res.json(errorString)
  }

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const signup_date = new Date()
  const password_hash = await bcrypt.hash(password, saltRounds)

  const data = await register(
    client,
    email,
    password_hash,
    signup_date,
    user_handle
  )
  client.end()
  return res.json(data)
})

module.exports = registerController
