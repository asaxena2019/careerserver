var gapi = require('./gapi');

var resources = [];
  
let resourceRow = { 
   type: "Resource",
   dateAdded: "Date Added", 
   title: "Name", 
   company: "Name", 
   link: "Link", 
   description: "Description", 
   deadline: "Deadline",
   imageLink: "imageLink",
   tags: "tags"
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
            console.log("message: " + message.values)
            if (result.values.length) {
                resources =[];
                
                result.values.map((row) => {
                    var category = JSON.stringify(result.range).split('!')[0].replace(/"/g,"");
                    resourceRow.type = category;
                    resourceRow.dateAdded = row[0];
                    resourceRow.title = row[1];
                    resourceRow.company = row[2];
                    resourceRow.link = row[3];
                    resourceRow.description = row[4];
                    resourceRow.deadline = row[5];
                    resourceRow.imageLink = row[6];
                    resourceRow.tags = row[7].split(", ");
                    resources.push(JSON.parse(JSON.stringify(resourceRow)));
                });
              } else {
                console.log('No data found.');
              } 
            callback(resources);
        });
    }
};