var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    });

    var child = spawn('java', ['-Djava.library.path=../Libs/xbee-api','-jar','Java/XbeeBridge.jar','sala','0']);
    
    child.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
    });

}).listen(3000);
