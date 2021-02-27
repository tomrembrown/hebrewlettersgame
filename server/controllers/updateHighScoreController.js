'use strict'
/*
 * This handles the rest API endpoint: patch /updatehighscore. It receives a
 * json object with id and high_score and updates the high_score for that
 * id in the high_scores table
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const updateHighScore = require('../model/updateHighScore')
const getProfile = require('../model/getProfile')
const { Client } = require('pg')
const { validateId, validateHighScore } = require('../common/validation')

const updateHighScoreController = asyncMiddleware(async (req, res) => {
  const { id, high_score } = req.body

  let errorArray = []
  if (!validateHighScore(high_score)) errorArray.push('invalid high_score')
  if (!validateId(id)) errorArray.push('invalid id')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = new Client()
  await client.connect()

  await updateHighScore(client, id, high_score)
  const data = await getProfile(client, id)
  await client.end()
  return res.json(data)
})

module.exports = updateHighScoreController
