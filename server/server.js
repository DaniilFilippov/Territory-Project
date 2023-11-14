// server
const express = require('express');
const bodyParser = require('body-parser');
const territoryRoute = require('./routes/territoryRoute');
const landsRoute = require('./routes/landsRoute');
const buildingsRoute = require('./routes/buildingsRoute');
const floorsRoomsRoute = require('./routes/floorsRoomsRoute');
const path = require('path');

const app = express();
const port = 8081;
app.use(bodyParser.json());


// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Send home page
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname,'client','pages','index.html'));
});

//List of territory
app.get('/territories', function(req, res) {
    res.sendFile(path.join(__dirname,'client','pages','territory.html'));
}); 

//Map by id
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname,'client','pages','map.html'));
}); 

//Territory by id
app.get('/territories/:id', function(req, res) {
    const territoryId = req.params.id;

    res.sendFile(path.join(__dirname,'client','pages','territory.html'));  
}); 


//lands by id
app.get('/lands', function(req, res) {
    const landId = req.params.id;

    res.sendFile(path.join(__dirname,'client','pages','landmap.html'));  
}); 

//lands by id
app.get('/buildings/', function(req, res) {
    const landId = req.params.id;

    res.sendFile(path.join(__dirname,'client','pages','buildingmap.html'));  
}); 


//lands by id
app.get('/buildings/:id', function(req, res) {
    const landId = req.params.id;

    res.sendFile(path.join(__dirname,'client','pages','buildingmap.html'));  
}); 


//Territory by id
app.get('/lands/:id', function(req, res) {
    const landId = req.params.id;

    res.sendFile(path.join(__dirname,'client','pages','landmap.html'));  
}); 

app.use('/api', territoryRoute);
app.use('/api', landsRoute);
app.use('/api', buildingsRoute);
app.use('/api', floorsRoomsRoute);

app.listen(process.env.PORT || port);