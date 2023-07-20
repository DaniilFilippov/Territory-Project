const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require('./config/config');
const path = require('path');

/*
const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [ oracledb.CLOB ];
*/
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.json('This is territory cite!');
})

app.get('/globalmap', (req, res) =>{
    getTerritory(req, res);
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','index.html'));
  });
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','style.css'));
  });
app.get('/BG.jpg', function(req, res) {
res.sendFile(path.join(__dirname,'..','client','src','BG.jpg'));
});
app.get('/app.js', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','app.js'));
  });
  app.listen(process.env.PORT || 8081);
/*
async function init() {
    try {

        await oracledb.createPool({
            user          : "parus",
            password      : "parus",  
            connectString : '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = db2.miit.ru)(PORT = 1521))) (CONNECT_DATA = (SERVICE_NAME = cmptest.miit.ru)))'
        });

        app.get('/home', (req, res) => {
            handleRequest(req, res);
        });

       
        app.listen(process.env.PORT || 8081);

        console.log("Server is running");

    } catch (err) {
        console.error("init() error: " + err.message);
    }
}

async function handleRequest(request, response) {
    let connection;
    try {

        connection = await oracledb.getConnection();  // get a connection from the default pool
        const result = await connection.execute(`SELECT * FROM fd_t_territory`);
        console.log("Result is:", result.rows);
        
    } catch (err) 
    {
        console.log("Error");  
    } finally {
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
            } catch (err) {
                console.error(err);
            }
        }
    }
}
init();

async function getTerritory(request, response) {
    
    const pool = oracledb.getPool();
    const connection = await pool.getConnection();
    
    try {
        const result = await connection.execute(`SELECT * FROM fd_t_territory`);
        response.json(result.rows);
    }
    catch (err)
    {
        console.log("Error");
    } 
    finally 
    {
        if (connection) {
            try {
                await connection.close();  // always release the connection back to the pool
                console.error('close');
            } catch (err) {
                console.error(err);
            }
        }
    }
    
}
*/

app.post('/globalMap', (req, res) => {
    console.log(req.body);
})


app.post('/register', (req, res) => {

    res.send({
        message: 'User was registered'
    });
})
/*
app.post('/territories', (req, res) => {
    getTerritory(req, res)
})

*/



 