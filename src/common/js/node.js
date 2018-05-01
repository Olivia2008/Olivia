var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var apiRoutes = express.Router();


// 设置根目录路由
app.get('/api/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

// 获取的远程数据接口
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;


app.get('/api/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
app.get('/api/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
app.get('/api/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);
// 使用的静态文件
app.use(express.static('./dist'));
// 监听的端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  var uri = 'http://localhost:' + port;
  console.log('Listening at ' + uri + '\n');
});
