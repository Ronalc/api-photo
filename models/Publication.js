'use strict'
/*
  * Dependecias
*/
const mongoose = require('mongoose')
let Schema = mongoose.Schema

// Modelo de las publicaciones
let publication_schema = new Schema({
  title: {
    type: String,
    require: true
  },
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  extension:{
    type: String,
    require: true
  }
})

const Publication = mongoose.model('Publication', publication_schema)

module.exports = Publication
