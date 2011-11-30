var db = {};
exports.db = db;

/*
 * GET home page.
 */

exports.getSensor = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var result = collection.findOne({Nome:req.params.nome}, function(err, item){
          if(!item)
            item = {};
          res.render('gerenciar/sensor', { title: 'Gerenciar Sensor', sensor: item }); 
        });
      });
    };
  });
};
