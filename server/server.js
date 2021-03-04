'use strict'

require('dotenv').config() // load the environment variables from .env

// Set up secure server if running on production
let credentials
if (process.env.NODE_ENV === 'production') {
  const sslLocation = process.env.SSL_LOCATION
  const fs = require('fs')
  const https = require('https')
  const privateKey = fs.readFileSync(sslLocation + 'privkey.pem', 'utf8')
  const certificate = fs.readFileSync(sslLocation + 'cert.pem', 'utf8')
  const ca = fs.readFileSync(sslLocation + 'chain.pem', 'utf8')
  credentials = { key: privateKey, cert: certificate, ca: ca }
}

const express = require('express')
const cors = require('cors')

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

if (process.env.NODE_ENV === 'production') {
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(app.get('port'), () => {
    console.log(logString)
  })
} else {
  app.listen(app.get('port'), () => {
    console.log(logString)
  })
}
