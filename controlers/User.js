'use strict'
const User = require('../models/User').User
const services = require('../middlewares/services')
const encrypt = require('../middlewares/encrypt')

// POST - Add new user
exports.add = (req,res) => {
  console.log('POST/')
  if (!req.body) res.status(400).json({error: true, message:'Body empty'})
  console.log(req.body);
  let user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: encrypt.generate(req.body.password),
    age: req.body.age,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    sex: req.body.sex,
    password_confirmation: req.body.passwordConfirmation
  })
  user.save((err) => {
    if (err) return res.status(500).json({error: true, message: err})
    res
      .status(201)
      .json({message:'user create'})
  })
}
// GET - Return all users
exports.findAll = (req,res) => {
  console.log('GET/')
  User.find((err, users) => {
    if(err) res.status(500).json({error:true, message:err.message})
    res
      .status(200)
      .json({users:users})
  })
}
//GET - Return user byId
exports.findById = (req,res) => {
  console.log('GET/')
  if (!req.params.id) res.status(400).json({error: true, message:'error id'})
  User.finById(req.params.id,(err,user) => {
    if(err) res.status(500).json({error:true, message:err.message})
    res
      .status(200)
      .json({user:user})
  })
}
//PUT- Edit register for user
exports.update = (req,res) => {
  console.log('PUT/')
  if(!req.params.id) res.status(400).json({error: true, message:'error id'})
  User.findById(req.params.id,(err,user) => {
    if (err) res.status(500).json({error:true, message:err.message})

    // validate update attribute
    if (req.body.name) user.name = req.body.name
    if (req.body.lastName) user.lastName = req.body.lastName
    if (req.body.userName) user.userName = req.body.userName
    if (req.body.age) user.age = req.body.age
    if (req.body.dateOfBirth) user.dateOfBirth = req.body.dateOfBirth
    if (req.body.email) user.email = req.body.email
    if (req.body.sex) user.sex = req.body.sex
    if (req.body.password) user.password = req.body.password
    /* el error, corregir la validacion de las contraseñas en el modelo!!!
    if (req.body.passwordConfirmation) {
        user.password_confirmation = req.body.passwordConfirmation
    }
    else {
      user.password_confirmation = req.body.password
    }
    */
    console.log('AKA------------>>>> '+user.password_confirmation)
    user.save((err) => {
      if(err) res.status(500).json({error:true, message:err})
      res
        .status(200)
        .json({user:user})
    })
  })
}
//DELETE- delete user for id
exports.delete = (req,res) => {
  if(!req.params.id) res.status(400).json({error:true, message:'body empty'})
  User.findById(req.params.id, (err,user) => {
    if (err) res.status(500).json({error:true, message:err.message})
    user.remove((err) => {
      if (err) res.status(500).json({error:true, message:err.message})
      res
        .status(200)
        .json({message:'Successfully delete'})
    })
  })
}
//Login- User
exports.login = (req,res) => {
  if(!req.body) return res.status(400).json({error:true,message:'Body empty'})
  if(!req.body.email) return res.status(400).json({error:true,message:'email null'})
  let email = req.body.email
  if(!req.body.password) return res.status(400).json({error:true,message:'password null'})
  let password = req.body.password

  // find user by email
  User.findOne({email: email},(err,user) => {
      if (err) return res.status(500).json({error:true, message:err.message})

      // hash compare if true create token
      encrypt.compare(password, user.password, (err, resLogin) => {
        if (err) return res.status(500).json({error:true,message:err})
        if (resLogin) {
          // create token for user
          let token = services.createToken(user)
          return res.status(200).json({token:token})
            console.log(token);
        }
        return res.status(400).json({error:true,message:'password or email fail'})
      })

    })
}
