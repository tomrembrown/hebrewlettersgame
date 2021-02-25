'use strict'
/*
 * This handle the rest API endpoint: get /profile/:id
 * It receives as the express parameter the id of the profile - and then
 * returns only the 'safe' items of the profile contained in the scores
 * table. It returns a json object containing id, user_handle, high_score,
 * and rank (the user's position in the table sorted by high scores)
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const getProfile = require('../model/getProfile')
const { Client } = require('pg')

const getProfileController = asyncMiddleware(async (req, res) => {
  const { id } = req.params
  const client = new Client()
  await client.connect()
  const data = await getProfile(client, id)
  await client.end()
  if (data.length === 0) return res.json('Profile not found')
  else return res.json(data)
})

module.exports = getProfileController
