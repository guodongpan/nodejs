// 创建一个框架
var express=require('express');
// 新建路由
var router=express.Router();
// 当用户访问/admin/user的时候处理请求
router.get('/user',function(req,res,next){
    res.send("admin-User");
});
//"返回数据给app.js"
module.exports=router;