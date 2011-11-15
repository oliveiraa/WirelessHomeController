
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socket = require('socket.io')

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

// Sockets

io.sockets.on('connection', function(socket){
  socket.on('EnviaMensagemSensor', function (data){
    console.log('Recebido mensagem no servidor do evento "EnviaMensagemSensor", fazendo broadcast');
    socket.broadcast.emit('BridgeEnviaDados',data);
  });
  
  socket.on('BridgeRecebeDados', function (data){
    console.log('Recebido mensgem no servidor do evento "BridgeRecebeDados"');
  });
});

// Routes

app.get('/', routes.index);

app.get('/comodo', routes.getComodos);

app.get('/comodo/:id', routes.getComodo);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
