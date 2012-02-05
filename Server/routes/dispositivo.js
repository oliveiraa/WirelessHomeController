var db = {};
exports.db = db;

/*
 * GET home page.
 */

exports.criar = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var result = collection.findOne({Nome: req.params.nome}, function(err, item){
          if(!item)
            item = {};
          if(!item.Dispositivos)
            item.Dispositivos = [];
          res.render('dispositivos/criar', { title: 'Criar Dispositivo', sensor: item });
        });
      });
    };
  });
};

exports.criarPost = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var result = collection.findOne({Nome: req.body.nomeSensor}, function(err, item){
          if(item) {
            if(!item.Dispositivos) {
              item.Dispositivos = [];
            };
            item.Dispositivos.push(req.body.dispositivo);
            collection.update({Nome: req.body.nomeSensor},item,{safe:true},function(err, result) {
              res.send({result: result, err: err});
            });
          };
        });
      });
    };
  });
};

exports.editar = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        collection.findOne({'Dispositivos.Nome': req.params.nome}, function(err, item) {
          for(i = 0; i < item.Dispositivos.length; i++) {
            if(item.Dispositivos[i].Nome === req.params.nome) {
              res.render('dispositivos/editar', { title: 'Editar Dispositivo', sensor: item, dispositivo: item.Dispositivos[i] });
              return;
            };
          };
        });
      });
    };
  });
};

exports.deletar = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        collection.findOne({Nome: req.body.nomeSensor}, function(err, item) {
          for(i = 0; i < item.Dispositivos.length; i++) {
            if(item.Dispositivos[i].Nome === req.body.nomeDispositivo) {
              var posRemover = i;
            };
          };
          if(posRemover != undefined) {
            item.Dispositivos.remove(posRemover);
            collection.update({Nome: req.body.nomeSensor}, item, {safe: true}, function(err, result){
              res.send({err: err, result: result});
            });
          };
        });
      });
    };
  });
};

exports.editarPost = function(req, res) {
  this.db.open(function(err, db) {
    if(!err) {
      db.collection('Sensores', function(err, collection) {
        var result = collection.findOne({Nome: req.body.nomeSensor}, function(err, item){
          if(item) {
            for(i = 0; i < item.Dispositivos.length; i++) {
              if(item.Dispositivos[i].Nome === req.body.dispositivo.Nome) {
                item.Dispositivos[i] = req.body.dispositivo;
                break;
              };
            };
            collection.update({Nome: req.body.nomeSensor},item,{safe:true},function(err, result) {
              res.send({result: result, err: err});
            });
          };
        });
      });
    };
  });
};
