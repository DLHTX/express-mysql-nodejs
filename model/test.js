var mysql = require('mysql');
var connection ={
  host     : 'localhost',
  user     : 'root',
  port: '3306',
  password : 'password',
  database : 'expressdb'
};

let connect=mysql.createConnection(connection);
 
connect.connect(function(err){
    if(err){
        console.log(`mysql连接失败: ${err},正在重新连接...`);
    }else{
        console.log("mysql连接成功!");
    }
});