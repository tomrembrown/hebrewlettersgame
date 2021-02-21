'use strict'

const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

require('dotenv').config() // load the environment variables from .env

// Require the controllers for the REST API
const createController = require('./controllers/createController')
const readController = require('./controllers/readController')
const updateController = require('./controllers/updateController')
const deleteController = require('./controllers/deleteController')

const app = express()

app.use(history()) // To get the SPA router to work

// For security reasons, don't send info on server to client
app.disable('x-powered-by')

app.set('port', process.env.PORT)

// CRUD REST API Controllers
app.use('/createController', createController)
app.use('/readController', readController)
app.use('/updateContoller', updateController)
app.use('/deleteController', deleteController)

// Error handling
app.use((error, req, res, next) => {
  console.log('Error occurred in express')
  res.json({ isError: true, message: error.message })
})

let logString =
  'Express started on ' + app.get('port') + '; press Ctrl-C to terminate'

app.listen(app.get('port'), () => {
  console.log(logString)
})
