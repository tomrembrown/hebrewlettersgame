'use strict'
/*
 * This handles the rest API endpoint: patch /updatehandle. It receives a
 * json object with id and user_handle and updates the user_handle for that
 * id in the high_scores table
 */

const asyncMiddleware = require('../utils/asyncMiddleware')
const updateHandle = require('../model/updateHandle')
const { Client } = require('pg')
const { validateId, validateUserHandle } = require('../../common/validation')

const updateHandleController = asyncMiddleware(async (req, res) => {
  const { id, user_handle } = req.body

  if (!validateId(id) || !validateUserHandle(user_handle))
    return res
      .status(400)
      .json(
        'patch updateHandle requires valid id and valid user_handle in body'
      )

  const client = new Client()
  await client.connect()

  await updateHandle(client, id, user_handle)
  await client.end()
  return res.json('success')
})

module.exports = updateHandleController
