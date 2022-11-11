var loginMiddleware=require('../middlewares/login')
var {body} = require('express-validator')
var payment = require('../middlewares/payment')
var auth=require('../middlewares/auth')

var confirm=require('../middlewares/confirmTrx')
const historyTrx = require('../middlewares/historyTrx')
class route{
    routeIndex(app){
        app.get('/',(req,res)=>res.redirect('/payment'))
        app.get('/logout',(req,res)=>{
            res.cookie('user','')
            return res.redirect('/login')
        })
        app.get('/login',loginMiddleware.loginGET)
        app.post('/login',body('username').not().isEmpty(),body('password').not().isEmpty(),loginMiddleware.loginPOST)
        app.get('/payment',auth,payment.paymentGET)
        app.get('/get-tuition-infor',payment.GETTuitionInfor)
        app.post('/payment',auth,payment.paymentPOST)
        app.get('/confirm-otp',auth,confirm.otpGET)
        app.post('/confirm-otp',auth,confirm.otpPOST)
        app.get('/history-transaction',auth,historyTrx)
    }
}

module.exports= new route()