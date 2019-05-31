var mongoose=require('mongoose');

module.exports= new  mongoose.Schema({
    username:String,
    password:String,
    // 是否为管理员的标记，默认为否
    isAdmin:{type:Boolean,default:false}
})