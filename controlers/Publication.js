'use strict'
const Publication = require('../models/Publication')
const fs = require('fs');

//POST - Add new pubication
exports.add = (req,res) => {
  console.log('POST/')
  if (!req.body) res.status(400).json({error:true, message:'body empty'})
  let extension = req.body.file.split('.').pop()
  let publication = new Publication({
    title: req.body.title,
    creator: req.body.creator,
    extension: extension
  })
  Publication.save((err) => {
    if (err) res.status(500).json({error:true, message:err.message})
    //client.publish('publications', JSON.stringify(imgJSON))
    //fs.rename(req.body.file.path, 'public/images/'+ publication._id+'.'+extension)
    res
      .status(201)
      .json({publication:publication})
  })

}
//GET - Return all publications
exports.findAll = (req,res) => {
  console.log('GET/')
  Publication.find((err,publications) => {
    if (err) res.status(500).json({error:true,message:err.message})
    res
      .status(200)
      .json({publications:publications})
  })
}
//GET - Return publications byId
exports.findById = (req,res) => {
  console.log('GET/')
  if (!req.params.id) res.status(400).json({error:true, message:'error Id'})
  Publication.findById(req.params.id,(err,publication) => {
    if (err) res.status(500).json({error:true, message:err.message})
    res
      .status(200)
      .json({publication:publication})
  })
}
// GET - Return publications for user
exports.findByIdUser = (req,res) => {
  if (!req.params.id) res.status(400).json({error:true, message:'error Id'})
  Publication.find({creator:req.params.id},(err,publication) => {
    if(err) res.status(500).json({error:true, message:err.message})
    res
      .status(200)
      .json({publication:publication})
  })
}
//PUT - Edit publication for id
exports.update = (req,res) => {
  if(!req.params.id) res.status(400).json({error:true, message:'error Id'})
  Publication.findById(req.params.id,(err,publication) => {
    if (err) res.status(500).json({error:true, message:err.message})
    // validate update attribute
    if (req.body.title) publication.title = req.body.title
    publication.save((err) => {
      if (err) res.status(500).json({error:true, message:err.message})
    })
  })
}
//DELETE- delete publication for id
exports.delete = (req,res) => {
  if (!req.params.id) res.status(400).json({error:true, message:'error id'})
  Publication.findById(req.params.id,(err,publication) => {
    if (err) res.status(500).json({error:true, message:err.message})
    publication.remove((err) => {
      if (err) res.status(500).json({error:true, message:err.message})
      res
        .status(200)
        .json({message:'Successfully delete'})
    })
  })
}
