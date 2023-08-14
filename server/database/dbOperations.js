const oracledb = require('oracledb');
const dbConfig = require('./dbconfig'); 
oracledb.initOracleClient({libDir: 'C:\\instantclient_19_19'});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [ oracledb.CLOB ];

async function executeSQL(sql, binds = []) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(sql, binds, { autoCommit: true });
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  module.exports = {
    executeSQL,
  };
