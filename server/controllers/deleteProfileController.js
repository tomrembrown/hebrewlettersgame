'use strict'
/*
 * This handles the route delete - profile/:id
 * It receives as the express parameter the id of the profile - and
 * then deletes this profile in all database tables - the return message
 * to the client is just a success message if it worked
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const deleteProfile = require('../model/deleteProfile')
const { Client } = require('pg')
const { validateId } = require('../common/validation')

const deleteProfileController = asyncMiddleware(async (req, res) => {
  const { id } = req.params

  if (!validateId(id)) return res.json('invalid id')

  const client = new Client()
  await client.connect()
  await deleteProfile(client, id)
  await client.end()
  res.json('success')
})

module.exports = deleteProfileController
