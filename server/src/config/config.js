const configDb = {
    user          : "parus",
    password      : "parus",  
    connectString : '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = db2.miit.ru)(PORT = 1521))) (CONNECT_DATA = (SERVICE_NAME = cmptest.miit.ru)))'    
}



module.exports = {
    port: 8081,
    configDb
}