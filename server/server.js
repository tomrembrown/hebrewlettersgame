'use strict'

const express = require('express')
const cors = require('cors')

require('dotenv').config() // load the environment variables from .env

// Require the controllers for the REST API
const registerController = require('./controllers/registerController')
const signinController = require('./controllers/signinController')
const getProfileController = require('./controllers/getProfileController')
const getScoreListController = require('./controllers/getScoreListController')
const checkHandleTakenController = require('./controllers/checkHandleTakenController')
const updateHighScoreController = require('./controllers/updateHighScoreController')
const updateHandleController = require('./controllers/updateHandleController')
const deleteProfileController = require('./controllers/deleteProfileController')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// For security reasons, don't send info on server to client
app.disable('x-powered-by')

app.set('port', process.env.PORT)

// CRUD REST API endpoints
// Create
app.post('/register', registerController)
//Read
app.post('/signin', signinController) // post to avoid non-secure sending of password
app.get('/profile/:id', getProfileController)
app.get('/scoreList', getScoreListController)
app.get('/checkHandleTaken', checkHandleTakenController)
//Update
app.patch('/updateHighScore', updateHighScoreController)
app.patch('/updateHandle', updateHandleController)
//Delete
app.delete('/profile/:id', deleteProfileController)

let logString =
  'Express started on ' + app.get('port') + '; press Ctrl-C to terminate'

app.listen(app.get('port'), () => {
  console.log(logString)
})
