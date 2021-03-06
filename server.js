'use strict'
/*
  * Dependencias
*/
const express = require('express')
const expresSession = require('express-session')
const http = require('http')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const routerApp = require("./routerApp");
const authSession = require('./middlewares/session')
const UserCtrl = require('./controlers/User')

const app = express()
const server = http.Server(app)
const routerAuth = express.Router()
/*
  * Use middlewares
*/
  app.use('/public', express.static('public'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  //app.use(sessionMiddlewareRedis)
  app.use(methodOverride('_method'))
/*
  * Iniciando Server
*/
console.log('------------------------------')
console.log('----------Iniciando-----------');
console.log('------------------------------')


// conect BD
mongoose.connect('mongodb://localhost/api-photo', (err,res) => {
  if(err) res.status(500).json({error:true, message:err.message})
  console.log('Connect to Database')
})



/*
  * Enrutamineto
*/
// route Auth
routerAuth.route('/login')
  .post(UserCtrl.login)

routerAuth.route('/signup')
  .post(UserCtrl.add)


// Route Basic user
routerAuth.route('/')
  .get((req,res) => {
    res.status(200).json({message:'Hola client'})
  })


app.use('/api',routerAuth)
app.use('/api/app', authSession.ensureAuthenticated)
app.use('/api/app',routerApp)
server.listen(8000)
module.exports = server
