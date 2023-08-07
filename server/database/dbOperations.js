const oracledb = require('oracledb');
const dbConfig = require('./dbconfig'); 
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});