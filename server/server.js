// server
const express = require('express');
const bodyParser = require('body-parser');
const territoryRoute = require('./routes/territoryRoute');
const landsRoute = require('./routes/landsRoute');
const path = require('path');

const app = express();
const port = 8081;
app.use(bodyParser.json());


// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Send home page
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname,'client','index.html'));
});

//List of territory
app.get('/territories', function(req, res) {
    res.sendFile(path.join(__dirname,'client','territories.html'));
}); 

//Map by id
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname,'client','map.html'));
}); 

//Territory by id
app.get('/territories/:id', function(req, res) {
    const territoryId = req.params.id;

    res.sendFile(path.join(__dirname,'client','territory.html'));  
}); 

app.use('/api', territoryRoute);
app.use('/api', landsRoute);

app.listen(process.env.PORT || port);