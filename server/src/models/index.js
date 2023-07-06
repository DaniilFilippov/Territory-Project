const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config')
const oracledb = require("oracledb");
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});
const db = {}

const squalize = new Sequelize({
    dialect: 'oracle',
    username: 'parus', 
    password: 'parus',
    dialectOptions: {
        connectString: '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = db2.miit.ru)(PORT = 1521))) (CONNECT_DATA = (SERVICE_NAME = cmptest.miit.ru)))'
    }
})
module.exports = db;