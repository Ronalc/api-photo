'use strict'
/*
  * Dependencias
*/
const Publication = require('../models/Publication')

/*
  * Este modulo valida los permisos sobre las publicationes
*/

module.exports = (publication, req, res) => {

    //true si tiene permisos sobre la imagen
    // false si no tienes perminsos de para editarla

    if (req.method === 'GET' && req.path.indexOf('edit') < 0) {
      return true
    }
    if (typeof publication.creator == 'undefined') {
      return false
    }
    if (publication.creator._id.toString() == res.locals.user._id) {
      // Verifica que la imagen sea del usuario logeado
      return true
    }
    return false
}
