var userModel = require('../models/user')
var { validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')
function loginGET(req, res) {
    if(req.cookies.user){
        return res.redirect('/payment')
    }
    res.render('login')

}

async function loginPOST(req, res) {
    //handle error form validator
    const err = validationResult(req)
    if (!err.isEmpty()) {
        console.log(err)
        req.session.message = 'TÀI KHOẢN KHÔNG HỢP LỆ VUI LÒNG KIỂM TRA LẠI'
        return res.redirect('/login')
    }

    console.log(req.body)
    var userInfor = await userModel.findOne({ username: req.body.username, password: req.body.password })
    if (userInfor) {
        sign = jwt.sign({
            data: {
                username: userInfor.username,
                fullname: userInfor.fullname,
                phone: userInfor.phone,
                email: userInfor.email,
            }
        }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
        console.log(sign)
        res.cookie('user', sign)
        res.redirect('/payment')
        // res.json({ 'token': sign })
        return
    }
    req.session.message='SAI TÀI KHOẢN HOẶC MẬT KHẨU'
    res.status(401).redirect('/login')
}


module.exports = {
    loginGET,
    loginPOST
}