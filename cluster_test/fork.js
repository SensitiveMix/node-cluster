const cluster= require('cluster')
const http = require('http')
const cpu = require('os').cpus().length


/**
 * [if description]
 * @param  {[type]} cluster.isMaster [description]
 * @return {[type]}                  [description]
 */
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < cpu; i++) {
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
  }).listen(8001);
}
var timeouts = [];
function errorMsg() {
  console.error("Something must be wrong with the connection ...");
}


/**
 * [description]
 * @param  {[type]} worker) {             console.log(`workers: ${worker.id} worker.process.pid :${worker.process.pid}`)  console.log(`worker suicide: ${worker.suicide [description]
 * @return {[type]}         [description]
 */
cluster.on('fork', function(worker) {
  console.log(`workers: ${worker.id} worker.process.pid :${worker.process.pid}`)
  console.log(`worker suicide: ${worker.suicide == true}`)
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});
/**
 * [description]
 * @param  {[type]} worker   [description]
 * @param  {[type]} address) {             console.log("A worker is now connected to " + address.address + ":" + address.port);	  clearTimeout(timeouts[worker.id]);} [description]
 * @return {[type]}          [description]
 */
cluster.on('listening', function(worker, address) {
  console.log("A worker is now connected to " + address.address + ":" + address.port);	
  clearTimeout(timeouts[worker.id]);
});

/**
 * [description]
 * @param  {[type]} worker  [description]
 * @param  {[type]} code    [description]
 * @param  {[type]} signal) {             clearTimeout(timeouts[worker.id]);  errorMsg();} [description]
 * @return {[type]}         [description]
 */
cluster.on('exit', function(worker, code, signal) {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});

/**
 * [description]
 * @param  {[type]} worker) {             console.log("Yay, the worker responded after it was forked");} [description]
 * @return {[type]}         [description]
 */
cluster.on('online', function(worker) {
  console.log("Yay, the worker responded after it was forked");
});

/**
 * [description]
 * @param  {[type]} worker) {             console.log('The worker #' + worker.id + ' has disconnected');} [description]
 * @return {[type]}         [description]
 */
cluster.on('disconnect', function(worker) {
  console.log('The worker #' + worker.id + ' has disconnected');
});