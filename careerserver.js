var http = require('http');
var url = require('url');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1f0XwxpTd1p9KM9hDsEPuXDYCoDtrqQUc5Ln98LvrK3M',
    range: 'Internships!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      //console.log('Rows:  ' + rows);
      // Print columns A and E, which correspond to indices 0 and 4.
      var temp = internshipRow
      rows.map((row) => {
        //console.log('row: ' + row);
        //var temp = internshipRow;
        temp.dateAdded = row[0];
        temp.name = row[1];
        temp.link = row[2];
        temp.description = row[3];
        temp.deadline = row[4];
        console.log("internshipRow: " + JSON.stringify(temp))
        internships.push(JSON.parse(JSON.stringify(temp)));
        //internships.push(temp);
      });
    } else {
      console.log('No data found.');
    }
    console.log(internships);
  });
}

const cols = [
  { key: "id", name: "ID", editableeee: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true }
 ];

 var internships = [];

 let internshipRow = { 
    type: "Internship",
    dateAdded: "Date Added", 
    name: "Name", 
    link: "Link", 
    description: "Description", 
    deadline: "Deadline" 
  };

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