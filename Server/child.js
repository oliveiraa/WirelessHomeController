var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(req,res){
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    });

    var child = spawn('java', ['SampleOut','ambiente','quarto']);
    
    child.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
    });

}).listen(3000);
