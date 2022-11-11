var jwt = require('jsonwebtoken')
function auth(req,res,next){
    if(!req.cookies){
        res.render('login')
        return
    }
    jwt.verify(req.cookies.user,process.env.SECRET_KEY,function(err,decoded){
        if(err){
            return res.redirect('/login')
            // res.json("invalid token")
        }
        else{
            req.data=decoded.data
            next()
        }
    })
}

module.exports=auth