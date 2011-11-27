var mongo = require('mongodb')

var Server = mongo.Server;
var Db = mongo.Db;

function connect() {
  server = new Server('localhost', 27017, { auto_reconnect: true });
  db = new Db('WirelessHomeController', server);
  console.log("MongoDB Connecting...");
  return db;
};

exports.connect = connect;
