const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require('./config/config');

const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [ oracledb.CLOB ];

const app = express();



async function run() {
    const connection = await oracledb.getConnection(config.configDb);
    const result = await connection.execute(`SELECT * FROM fd_t_territory`);
    //[], // no binds
    //{ fetchInfo: {"SVGMAP": {type: oracledb.STRING}} });
   // console.log(result.rows[0]);
    return result.rows[0];
   
    //await connection.close();   // закрываем соединение всегда!

}

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/home', (req, res) => {
    res.send({
        message: 'Hello'
    });
});

app.post('/register', (req, res) => {
    res.send({
        message: 'User was registered'
    });
})

app.listen(process.env.PORT || 8081);


