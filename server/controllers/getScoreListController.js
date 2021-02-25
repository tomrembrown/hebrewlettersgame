'use strict'
/*
 * This handle the rest API endpoint: get /scorelist
 * It returns a json array of objects each with rank, user_handle, and
 * high_score as properties. The object is sorted in order of rank
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const getScoreList = require('../model/getScoreList')
const { Client } = require('pg')

const getScorelistController = asyncMiddleware(async (req, res) => {
  const client = new Client()
  await client.connect()
  const data = await getScoreList(client)
  await client.end()
  return res.json(data)
})

module.exports = getScorelistController
