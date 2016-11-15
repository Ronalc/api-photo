'use strict'
/*
  * Dependencias
*/
const express = require('express')
const UserCtrl = require('./controlers/User')
const PublicationCtrl = require('./controlers/Publication')

const router = express.Router()

router.route('/user')
  .get(UserCtrl.findAll)

// Router user by id
router.route('/user/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.update)
  .delete(UserCtrl.delete)
// Route basic publication
router.route('/publication')
  .get(PublicationCtrl.findAll)
  .post(PublicationCtrl.add)

// Router user by id
router.route('/publication/:id')
  .get(PublicationCtrl.findById)
  .put(PublicationCtrl.update)
  .delete(PublicationCtrl.delete)

// Route get all publications for user
router.route('/publication/user/:id')
  .get(PublicationCtrl.findByIdUser)
module.exports = router
