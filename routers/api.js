var express=require('express');

var router=express.Router();


var User=require('../models/User');


var resData;

router.use(function(req,res,next){
    resData={
        code:0,
        msg:''
    };
    next();
    console.log("不管调用的什么都用到的函数");
})

router.post('/user/zc',function(req,res,next){
    

    console.log(req.body);

    var un=req.body.un;
    var pw1=req.body.pw1;
    var pw2=req.body.pw2;
    console.log(req.body.un);

    if(un=="")
    {
        resData.code=1;
        resData.msg="用户名不能为空！";
        res.json(resData);
        console.log(req.body.un);
        return;
    };
    if(pw1=="")
    {
        resData.code=2;
        resData.msg="密码不能为空！";
        res.json(resData);
        return;
    };
    if(pw2=="")
    {
        resData.code=3;
        resData.msg="再次输入的密码不能为空！";
        res.json(resData);
        return;
    };
    if(pw2!=pw1)
    {
        resData.code=4;
        resData.msg="两次输入的密码不一致！";
        res.json(resData);
        return;
    };

    User.findOne({username:un}).then(function(userInfo){

        if(userInfo)
        {
            resData.code=5;
            resData.msg="用户已经存在！";

            res.json(resData);
            return;
        }

        var user=new User({
            username:un,password:pw1
        });
        return user.save();
    }).then(function(newUserInfo){

        console.log(newUserInfo);

        resData.code=6;
        resData.msg="恭喜您注册成功，快去登陆吧！";
        res.json(resData);
    })
    
});


router.post('/user/dl',function(req,res,next){
    var un=req.body.un;
    var pw1=req.body.pw1;
    if(un==""||pw1=="")
    {
        resData.code=1;
        resData.msg="用户名或者密码不能为空！";
        res.json(resData);
        return;
    }

    User.findOne({
        username:un,
        password:pw1
    }).then(function(userInfo){
        if(!userInfo)
        {
            resData.code=2;
            resData.msg="用户名或者密码错误！";
            res.json(resData);

            return;
        }else
        {
            resData.code=3;
            resData.msg="登陆成功！";

            resData.userInfo={_id:userInfo._id,un:userInfo.username}
            // 发送一个cookies信息给浏览器,浏览器将它保存起来等下次刷新的时候把cookie通过请求头发送给服务器
            req.cookies.set('userInfo',JSON.stringify({_id:userInfo._id,un:userInfo.username}));
            res.json(resData);
            return;
        }

    })

});

// 退出
router.get('/user/dc',function(req,res,next){
    // 发送空的cookie覆盖原来的cookie
    req.cookies.set('userInfo',null);
    res.json(resData);
})



module.exports=router;