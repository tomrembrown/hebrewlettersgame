'use strict'
/*
 * This handles the rest API endpoint: patch /updatehandle. It receives a
 * json object with id and user_handle and updates the user_handle for that
 * id in the high_scores table
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const updateHandle = require('../model/updateHandle')
const { Client } = require('pg')
const { validateId, validateUserHandle } = require('../common/validation')

const updateHandleController = asyncMiddleware(async (req, res) => {
  const { id, user_handle } = req.body

  let errorArray = []
  if (!validateUserHandle(user_handle)) errorArray.push('invalid user_handle')
  if (!validateId(id)) errorArray.push('invalid id')

  if (errorArray.length > 0) {
    const errorString = errorArray.join()
    return res.json(errorString)
  }

  const client = new Client()
  await client.connect()

  await updateHandle(client, id, user_handle)
  await client.end()
  return res.json('success')
})

module.exports = updateHandleController
