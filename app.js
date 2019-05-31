var express=require('express');
var swig=require('swig');
var app=express();

var mongoose=require('mongoose');

var cookies=require('cookies');

var bodyParser=require('body-parser');
//引入模型
var User=require('./models/User');


app.use('/public',express.static(__dirname+'/public'));
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('views engine','html');
swig.setDefaults({cache:false});


app.use(function(req,res,next){
  console.log("访问我们站点都执行的函数");
  req.cookies=new cookies(req,res);

  console.log(req.cookies.get('userInfo'));

  req.userInfo={};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo=JSON.parse(req.cookies.get('userInfo'));
      // 从数据库中查找一个指定id的对象然后转化为布尔类型加载给userInfo的一个属性
      User.findById(req.userInfo._id).then(function(result)
      {
        req.userInfo.isAdmin=Boolean(result.isAdmin);
        console.log("test"+result.isAdmin);
        //执行next函数，执行了上面的函数后继续执行
        next();
      })
    }catch(e){next();};
  }else{next();}
  

})

app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27017/blog',function(err){
  if(err){console.log("失败")}
  else{
    console.log("成功");
    app.listen(8081);
  }
})

