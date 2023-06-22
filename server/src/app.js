const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});


const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 8081);

