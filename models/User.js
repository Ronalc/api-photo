'use strict'
/*
  * Dependecias
*/
const mongoose = require('mongoose')
let Schema = mongoose.Schema

const emailMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,"coloca un email valido"]
const posibleSex = ['Men', 'Female']

const passwordValidation = {
  validator: (p) => {
    console.log(this.passC + "-" + p)
    return this.passC == p
  },
  message: 'Las constraseñas no son iguales'
}

const user_schema = new Schema({
  name: String,
  lastName:String,
  userName: {
    type: String,
    required: 'user Name es obligatorio',
    maxlength: [50, 'Username es muy largo']
  },
  password: {
    type: String,
    required: 'La contraseña es obligatoria',
    maxlength: [8, 'Contraseña muy corta'],
    //validate: passwordValidation
  },
  age: {
    type: Number,
    min: [5,'La edad no puede ser menor que 5'],
    max: [100,'la edad no puede ser mayor que 100']
  },
  dateOfBirth: Date,
  email: {
    type: String,
    required: 'El correo es obligatorio',
    match: emailMatch
  },
  sex:{
    type: String,
    enum: {
      values: posibleSex,
      message: 'Opcion invalida'
    }
  }
})

user_schema.virtual('password_confirmation').get(() => {
  return this.passC
}).set((password) => {
  this.passC = password
})

const User = mongoose.model('User', user_schema)

module.exports.User = User
