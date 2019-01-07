var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../model/DBConfig');
var userSQL = require('../model/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据

// var responseJSON = function (res, ret) {
//   if(typeof ret === 'undefined') { 
//        res.json({ code:'-200',msg: '操作失败'   
//      }); 
//  } else { 
//    res.json(ret); 
// }};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.test, function (err,result) {
            if(err){
                console.log('[SELECT ERROR]:',err.message);
            }
            console.log(result);  //数据库查询结果返回到result中
        });
        res.send({status:0,data:'result'});
        connection.release(); 
     })
});

// 添加用户
router.get('/addUser', function(req, res, next){
  // 从连接池获取连接 
  pool.getConnection(function(err, connection) { 
  // 获取前台页面传过来的参数  
  var param = req.query || req.params;   
  // 建立连接 增加一个用户信息 
  connection.query(userSQL.insert, [param.uid,param.name], function(err, result) {
    if(result) {      
        result = {   
            code: 200,   
            msg:'增加成功'
        };  
    }     
    // 以json形式，把操作结果返回给前台页面     
    res.send({status:0,data:result});
    // 释放连接  
    connection.release();  
    });
  });
});




module.exports = router;
