var mongoose= require('mongoose')

var userSchema= mongoose.Schema({
    username:String,
    password:String,
    fullName:String,
    phone:String,
    email:String,
    balance:Number,
    historyTrx:[{
        typeTrx:String,
        studentID:String,
        amountPayable:Number,
        status:Boolean,
        createAt:Date,
    }]
})

var userModel =mongoose.model('user',userSchema)
module.exports=userModel