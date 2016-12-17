const cluster= require('cluster')
const http = require('http')
const cpu = require('os').cpus().length


console.log(cluster.isMaster)

/**
 * [if description]
 * @param  {[type]} cluster.isMaster [description]
 * @return {[type]}                  [description]
 */
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < cpu; i++) {
  	console.log(cluster.isWorker);
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}

