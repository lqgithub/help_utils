// const process = require("process")
const express = require('express');  
const path = require('path');  
const app = express();  
const WebSocket = require("ws")
const port = 3111; // 可以自定义端口号  
const ejs = require("ejs")
// const http = require('http');  

// 创建 HTTP 服务器  
// const httpServer = http.createServer();  
// httpServer.listen(8080, '0.0.0.0', function(e) {  
//   console.log('服务器已启动，监听地址: http://localhost:3000',e);  
// });
// console.log(httpServer);

// const {logger} = require("./utils/log")
const log4js = require('log4js');  
log4js.configure({
  appenders: { // 输出源
    out: { type: "stdout" },
    app: { type: "file", filename: "./log/application.log" },
    err: { type: 'stderr' }
  },
  categories: { // 类别
    default: { appenders: ["out", "app"], level: "debug" },
    normal: { appenders: ["out", "app"], level: "info" },
    err: { appenders: ["err"], level: "error" }
  },
})
const list = [
  {name:"张三",age:16},
  {name:"李四",age:17},
  {name:"王五",age:20},
  {name:"刘罗锅",age:15},
  {name:"王芳",age:19},
  {name:"胖丫",age:18},
]
const logger = log4js.getLogger("normal")
const file = "./assets/ejs/ul.ejs"
ejs.renderFile(file,{list},(err,res)=>{
  if(err){
    logger.error(err);
  }else{
    logger.info("//////",res);
  }
})
// 设置静态文件目录为public文件夹  
app.use(express.static(path.join(__dirname, 'public')));  

// 设置路由，将根路径指向public文件夹中的index.html文件  
app.get('/', function(req, res) {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});  
app.get('/data', (req, res) => {  
  const data = {  
    message: 'Hello, World!'  
  };  
  logger.info(data.message)
  res.json(data);  
});  
// 启动服务器并监听指定端口号  
app.listen(port, function() {  
  console.log('Server is running on port ' + port);  
  logger.info("日志")
});



const wss = new WebSocket.Server({port:8080})

wss.on('connection', function (ws) {  
  console.log('客户端已连接');  

  // 当收到消息时触发  
  ws.on('message', function (message) {  
    console.log('收到消息:', message);  
  });  

  // 向客户端发送消息  
  ws.send('服务器已准备好接收消息');  
});