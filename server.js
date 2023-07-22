// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require("express"); // Require Express to run server and routes
const app = express(); // Start up an instance of app
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const cors = require("cors"); // Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
const port = 5000;
app.listen(port, listening); // Setup Server
function listening() {
    console.log("the server is running on localhost: " + port);
}
// get method to send project data
app.get("/tempinfo", function(req, res) {
    res.send(projectData);

});
//post method to get the data then appending it to the object
app.post("/tempdata", getdata);

function getdata(req, res) {
    projectData = {
        ...req.body
    }
    res.send({
        success: true
    });
    console.log(projectData);
}