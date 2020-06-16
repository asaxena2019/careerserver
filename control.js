var gapi = require('./gapi');

var internships = [];
  
let internshipRow = { 
   type: "Internship",
   dateAdded: "Date Added", 
   name: "Name", 
   link: "Link", 
   description: "Description", 
   deadline: "Deadline" 
 };

module.exports = {
    /*
    * Function :
    * description :
    * Arguments : message , collect
    *
    */
    processMessage: function (message, callback)
    {
        console.log("process message");
        
        gapi.fetchData(message , function(result)
        {
            console.log("message: " + message)
            if (result.length) {
                var temp = internshipRow;
                internships =[];
                result.map((row) => {
                    internshipRow.type = message;
                    internshipRow.dateAdded = row[0];
                    internshipRow.name = row[1];
                    internshipRow.link = row[2];
                    internshipRow.description = row[3];
                    internshipRow.deadline = row[4];
                    console.log("internshipRow: " + JSON.stringify(internshipRow))
                    internships.push(JSON.parse(JSON.stringify(internshipRow)));
                });
              } else {
                console.log('No data found.');
              } 
            callback(internships);
        });
    }
};