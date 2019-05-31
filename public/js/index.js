$(document).ready(function(){
    $('#tozc').on('click',function(){
        $("#unmsg").html(" ");
        $("#pwmsg").html(" ");
        $("#resmsg").html(" ");
        getun=$('#getun').val();
        getpw1=$('#getpw1').val();
        getpw2=$('#getpw2').val();
        $.ajax({
            type:"post",
            async:true,
            url:'/api/user/zc',
            data:
            {
            un:getun,
            pw1:getpw1,
            pw2:getpw2
            },
            dataType:'json',
            success:function(result){
                if(result.code==1)
                {
                $("#unmsg").html(result.msg);
                return;
                }else if(result.code==2||result.code==3||result.code==4)
                {
                $("#pwmsg").html(result.msg);
                return;
                }
                else if(result.code==5)
                {
                $("#unmsg").html(result.msg);
                return;
                }
                else if(result.code==6)
                {
                $("#resmsg").html(result.msg);
                return;
                };
                return false;
            }   
        })
       
    });

    $('#todl').on('click',function(){
        $("#dlerrmsg").html("");
        $("#dlsuccmsg").html("");
        getun=$('#getdlun').val();
        getpw1=$('#getdlpw1').val();
        $.ajax({
            type:"post",
            async:true,
            url:'/api/user/dl',
            data:
            {
            un:getun,
            pw1:getpw1
            },
            dataType:'json',
            success:function(result){
                if(result.code==1)
                {
                $("#dlerrmsg").html(result.msg);
                return;
                }
                else if(result.code==2)
                {
                $("#dlerrmsg").html(result.msg);
                return;
                }
                else if(result.code==3)
                {
                $("#dlsuccmsg").html(result.msg);
               
                // 登陆成功刷新页面来渲染服务端模块
                window.location.reload();
                
                return;
                };
                return false;
            }   
        })
       
    });

// 登出
    $('#todc').on('click',function(){
        $.ajax({
            type:"get",
            async:true,
            url:'/api/user/dc',
            data:
            {},
            dataType:'json',
            success:function(result){ 
                if(result)
                {
                    window.location.reload();
                }
                
            }   
        })
    });
});