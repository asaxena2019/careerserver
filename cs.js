var http = require('http');
var url = require('url');
var control = require('./control');

// Create http server.
var httpServer = http.createServer(function (req, resp) {

 // Get an parse client request url.
 var reqUrlString = req.url;
 var urlObject = url.parse(reqUrlString, true, false);

 // Get user request file name.
 var fileName = urlObject.pathname;
 fileName = fileName.substr(1);

 var method = req.method;
 var json = '';
 console.log("Server Method: " + method);

 let payload = '';

 if("GET" == method){
    var temp = url.parse(req.url, true).pathname;
    var queryObj = temp.replace(/\//g,"");
       console.log(queryObj);

     control.processMessage(queryObj,function(result) {
      resp.statusCode = 200;
      resp.setHeader('Content-Type', 'application/json');
      resp.writeHead(200, {'Access-Control-Allow-Origin':'*'});
      resp.end(JSON.stringify(result));
      
      resp.on('error', (err) => {
          console.error(err);
      });
  });
 }
 else if("POST" == method){
   let body = [];

   req.on('error', (err) => {
   console.error(err);
   })
.on('data', (data) => {
body.push(data);
json += data;
   })
.on('end', () => {
body = Buffer.concat(body).toString();
resp.statusCode = 200;
resp.setHeader('Content-Type', 'application/json');
resp.writeHead(200, {'Access-Control-Allow-Origin':'*'});
resp.end(JSON.stringify(result));

resp.on('error', (err) => {
console.error(err);
});

});

 }
 else if("PUT" == method){
   resp.writeHead(201, {'Access-Control-Allow-Origin':'*'});
   resp.end(JSON.stringify({'Access-Control-PUT-Origin':'*'}));
 }
 else if("PATCH" == method){
   resp.writeHead(204, {'Access-Control-Allow-Origin':'*'});
   resp.end(JSON.stringify({'Access-Control-PATCH-Origin':'*'}));
 }
 else if("DELETE" == method){
   resp.writeHead(200, {'Access-Control-Allow-Origin':'*'});
   resp.end(JSON.stringify({'Access-Control-DELETE-Origin':'*'}));
 }
 else {
   resp.writeHead(400, {'Access-Control-Allow-Origin':'*'});
   resp.end(JSON.stringify({'Access-Control-GET-Origin':'*'}));
 }
});


httpServer.listen(4000);


function replyMessage (reply)
{
   console.log(JSON.stringify(reply));

}