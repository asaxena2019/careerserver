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
            callback(result);
        });
    }
};