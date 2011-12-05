
/**
 * Module dependencies.
 */

var express = require('express')
  , sensor = require('./routes/sensor')
  , dispositivo = require('./routes/dispositivo')
  , gerenciar = require('./routes/gerenciar')
  , socket = require('socket.io')
  , mongo = require('./mongo');

var app = module.exports = express.createServer();
var io = module.exports = socket.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// MongoDB
var db = mongo.connect();
sensor.db = db;

// Sockets

io.sockets.on('connection', function(socket){
  socket.on('EnviaMensagemSensor', function (data){
    console.log('Recebido mensagem no servidor do evento "EnviaMensagemSensor", fazendo broadcast, ' + data);
    socket.broadcast.emit('BridgeEnviaDados',data);
  });

  socket.on('BridgeRecebeDados', function (data){
    console.log('Recebido mensagem no servidor do evento "BridgeRecebeDados", fazendo broadcast, ' + data);
    socket.broadcast.emit('RecebeMensagemSensor',data);
  });
});

// Routes

function setJson(req, res, next) {
  req.isJSON = true;
  next();
};


// Json Routes
app.get('/sensor.json', setJson, sensor.getSensores);
app.get('/sensor.json/:nome', setJson, sensor.getSensor);

// Regular Routes
app.get('/', sensor.index);
app.get('/sensor', sensor.getSensores);
app.get('/sensor/sensores', sensor.getSensores);
app.get('/sensor/criar', sensor.criarSensor);
app.get('/sensor/:nome', sensor.getSensor);
app.post('/sensor/criar', sensor.criarSensorPost);
app.get('/dispositivos/criar/:nome', dispositivo.criar);
app.post('/dispositivos/criar', dispositivo.criarPost);
app.get('/dispositivos/editar/:nome', dispositivo.editar);
app.post('/dispositivos/editar', dispositivo.editarPost);
app.get('/gerenciar/:nome', gerenciar.getSensor);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
