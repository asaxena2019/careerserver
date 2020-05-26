var http = require('http');
var url = require('url');

const cols = [
  { key: "id", name: "ID", editableeee: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true }
 ];
 
 const internships = [
  { dateAdded: "5/23/2020", name: "MLH Fellowship", link: "https://fellowship.mlh.io/", description: "Spend 12 weeks working on an open source project", deadline: "5/24/2020"},
  { dateAdded: "5/23/2020", name: "MLH bruh", link: "https://fellowship.mlh.io/", description: "Spend 12 weeks working on an open source project", deadline: "5/25/2020"}
 ];

 const jobs = [
  { dateAdded: "5/23/2020", name: "job", link: "https://www.google.com/", description: "bruh", deadline: "5/24/2020"}
 ];

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
//   if (messageObj.info !== 'undefined'){
//     control.processMessage(function (){
       console.log("respd");
     //});
 //}
   resp.writeHead(200, {'Access-Control-Allow-Origin':'*'});
   resp.end(JSON.stringify(internships));
 }
 else if("POST" == method){
   let body = [];

   req.on('error', (err) => {
   console.error(err);
   })
.on('data', (data) => {
body.push(data);
json += data;
// payload += decoder.write(data);
   })
.on('end', () => {
body = Buffer.concat(body).toString();
// control.processMessage(json,function(result) {
resp.statusCode = 200;
resp.setHeader('Content-Type', 'application/json');
resp.writeHead(200, {'Access-Control-Allow-Origin':'*'});
resp.end(JSON.stringify(result));

resp.on('error', (err) => {
console.error(err);
});
//});

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