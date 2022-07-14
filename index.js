var http = require("http");
var fs = require("fs");

fs.readFile('lp.txt',function(err,date){
  if(err){console.err(err)};
  console.log(date.toString());
  
  console.log(Date());
})

http.createServer(function(request,response){
  response.writeHead(200,{'Content-Type':'text/plain'});
  response.end('hello,world\n');
}).listen(8888)

console.log('server run');