/*
 * Variables
 */
var db = {};
exports.db = db;

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Wireless Home Controller' })
};

exports.getSensores = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        collection.find().toArray(function(err,items) {
          if(req.isJSON)
            res.json(items);
          else
            res.render('sensor/sensores', {title: 'Sensores', items: items });
        });
      });
    };
  });
};

exports.getSensor = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var result = collection.findOne({Nome:req.params.nome}, function(err, item){
          if(!item)
            item = {};
          res.render('sensor/sensor', {title: 'Sensor', item: item});
        });
      });
    };
  });
};

exports.criarSensor = function(req, res) {
  res.render('sensor/criar', {title: 'Criar Sensor'});
};

exports.criarSensorPost = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var sensor = req.body.sensor;
        collection.insert(sensor, {safe: true}, function(err, result){
          res.send({err: err, result: result});
        });
      });
    };
  });
};
