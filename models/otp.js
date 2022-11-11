var mongoose = require('mongoose')

var otpSchema = mongoose.Schema({
    email:String,
    otp:Number,
    payFor:String,
})

var otpModel = mongoose.model('otp',otpSchema)
module.exports=otpModel