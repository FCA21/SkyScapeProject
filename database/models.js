const Usuario = require('../api/models/usuario.model.js');
const Localizacion = require('../api/models/localizacion.model.js');
const Actividad = require('../api/models/actividad.model.js');
const Rating = require('../api/models/rating.model');
const Usuario_Actividad = require('../api/models/usuario_actividad.model.js');

function setRelations() {
  try {
  
    /* IMPORTANTE: en la linea 16 Usuario_Actividad no va entre comillas porque es un modelo ya creado
        mientras que en la 20 usuario_favs si va entre comillas porque asi es como llamaremos a la tabla intermedia */

    //Muchos a muchos

    Actividad.belongsToMany(Localizacion, {through: 'actividad_localizacion'})
    Localizacion.belongsToMany(Actividad, {through: 'actividad_localizacion'})

    Usuario.belongsToMany(Actividad, { through: Usuario_Actividad });
    Actividad.belongsToMany(Usuario, { through: Usuario_Actividad });

     Usuario.belongsToMany(Actividad, {through: 'usuario_favs',as: 'userFav',});
    Actividad.belongsToMany(Usuario, { through: 'usuario_favs', as: 'actFav' });

    Usuario.belongsToMany(Actividad, { through: Rating, as: 'userRate' });
    Actividad.belongsToMany(Usuario, { through: Rating, as: 'actRate' }); 
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = { setRelations };
