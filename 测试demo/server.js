// const process = require("process")
const express = require('express');  
const path = require('path');  
const app = express();  
const port = 3000; // 可以自定义端口号  

// 处理history模式页面丢失
// var history = require('connect-history-api-fallback');
// app.use(history())

// 设置静态文件目录为public文件夹  
app.use(express.static(path.join(__dirname, 'public')));  

// 允许跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 设置路由，将根路径指向public文件夹中的index.html文件  
app.get('/', function(req, res) {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});  
app.get('/three', function(req, res) {  
  res.sendFile(path.join(__dirname, 'public', 'three.html'));  
});  
// 启动服务器并监听指定端口号  
app.listen(port, function() {  
  console.log('Server is running on port ' + port);  
});