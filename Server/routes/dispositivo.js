var db = {};
exports.db = db;

/*
 * GET home page.
 */

exports.criar = function(req, res) {
  res.render('dispositivos/criar', { title: 'Criar Dispositivo', sensor: req.params });
};

exports.criarPost = function(req, res) {
  res.render('sensor/', { title: 'Sensores'});
};
