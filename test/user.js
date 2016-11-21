'use strict'
let request = require('supertest-as-promised')
const config = require('../lib/config')
const api = require('../server')
const host = api


request = request(host)

describe('Ruta para los nuevos usuarios', () => {
  describe('POST /', () =>  {
    it('Esto deberia registrar un nuevo usuario',(done) => {
      let user = {
        "name": "test",
        "lastName": "testeando",
        "userName": "Testamendo",
        "password": "1234",
        "age": 18,
        "dateOfBirth": "04/06/1992",
        "email": "test@testeando.com",
        "sex": "Men",
        "passwordConfirmation": "1234"
      }
      request
        .post('/newUser')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end((err,res) => {
          let body = res.body
          expect(body).to.have.property('user')
          user = body.user

          expect(user).to.have.property('name','test')
          expect(user).to.have.property('lastName','testeando')
          expect(user).to.have.property('userName', 'Testamendo')
          expect(user).to.have.property('password', '1234')
          expect(user).to.have.property('age', 18)
          expect(user).to.have.property('email','test@testeando.com')

          expect(user).to.have.property('_id')

          done(err)
        })
    })
  })
  describe('POST /', () => {
    it('Esto deberia ingresar al login', (done) => {
      let login = {
        'email': 'test@testeando.com',
        'password': '1234'
      }

      request
        .post('/login')
        .set('Accept', 'application/json')
        .send(login)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end((err,res) => {
          let body = res.body
          console.log(body)
          expect(body).to.have.property('session_id')
          done(err)
        })
    })
  })
})
