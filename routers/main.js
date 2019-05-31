
var express=require('express');

var router=express.Router();

router.get('/',function(req,res,next){
    // 打印req.userInfo信息，这个userInfo是在我们自己写的中间件中加的
    // 执行到这里的时候就可以用
    console.log(req.userInfo);
    res.render('main/main.html',{
        userInfo:req.userInfo
    });
});

module.exports=router;