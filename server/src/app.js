const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require('./config/config');
const path = require('path');


const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [ oracledb.CLOB ];

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
//Отправка главной страницы
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','index.html'));
  });

//Список территорий
app.get('/lands', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','lands.html'));
});

//Список земельных участков
app.get('/territories', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','territories.html'));
}); 

//Список зданий
app.get('/buildings', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','buildings.html'));
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
app.get('/showTerr.js', function(req, res) {
    res.sendFile(path.join(__dirname,'..','client','showTerr.js'));
  });

app.get('/iconmenu.png', function(req, res) {
res.sendFile(path.join(__dirname,'..','client','src','iconmenu.png'));
});
app.get('/iconmenuclose.png', function(req, res) {
res.sendFile(path.join(__dirname,'..','client','src','iconmenuclose.png'));
});
app.get('/slider1.jpg', function(req, res) {
res.sendFile(path.join(__dirname,'..','client','src','slider1.jpg'));
});

// инициализация БД 
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
//Список всех территорий
async function getTerritory(request, response) {
    
    const pool = oracledb.getPool();
    const connection = await pool.getConnection();
    let territoryID = 'МоскваID';
    try {
        const result = await connection.execute(`SELECT CODE, NAME, ID, NOTE, SVGMAP  FROM fd_t_territory where ID = '${territoryID}'`);
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
//Список всех земельных участков
async function getLands(request, response) {
    
    const pool = oracledb.getPool();
    const connection = await pool.getConnection();
    
    try {
        const result = await connection.execute(`SELECT * FROM fd_t_land_plots`);
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
//Список всех зданий
async function getBuildings(request, response) {
    
    const pool = oracledb.getPool();
    const connection = await pool.getConnection();
    
    try {
        const result = await connection.execute(`select * from fd_t_bsr_master`);
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




app.post('/globalMap', (req, res) => {
    console.log(req.body);
})


app.post('/register', (req, res) => {

    res.send({
        message: 'User was registered'
    });
})

app.post('/territories', (req, res) => {
    getTerritory(req, res)
})





 