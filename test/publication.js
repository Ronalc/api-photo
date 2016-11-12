'use strict'
/*
  * Dependencias
*/
let request = require('supertest-as-promised')
const api = require('../server')
const host = api

request = request(host)

describe('Ruta para las publicaciones',() => {
  describe('POST /', () => {
      let publicacion = {
        'title': 'test',
        'creator': '58233eea8984262c8865e8dd',
        'file': 'enlaplaya.jpg'
      }
      it.only('esto deberia crear una nueva publicacion', (done) => {
        request
          .post('/app/publicationsForUser')
          .set('Accept','aplication/json')
          .send(publicacion)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .end((err, res) => {
            let body = res.body
            expect(body).to.have.property('publication')
            let publication = body.publication
            console.log(publication)
            expect(publication).to.have.property('_id')
            done(err)
          })
      })
  })
  describe('GET /', () => {
    it('Esto deberia devolver todas las publicaciones',(done) => {
      request
        .get('/app')
        .set('Accept','aplication/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end((err,res) => {
          let body = res.body
          expect(body).to.have.property('publications')
          done(err)
        })
    })
  })
})
