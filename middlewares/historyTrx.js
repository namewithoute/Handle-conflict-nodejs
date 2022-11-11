var userModel = require('../models/user')
var moment = require('moment')
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
async function historyTrx(req,res){
    var user= await userModel.findOne({username:req.data.username})
    var {historyTrx}=user
    var format =[]
    historyTrx.forEach((trx)=>{
        var {typeTrx,amountPayable,status,createAt,_id,studentID}=trx
        createAt=moment(createAt).format('MMMM Do YYYY, h:mm:ss a')
        amountPayable= formatter.format(amountPayable)
        id=_id.toString()
        status= status ? 'THÀNH CÔNG' : 'THẤT BẠI'
        format.push({typeTrx,amountPayable,status,createAt,id,studentID})
    })


    res.render('historyTrx',{history:format})
}

module.exports=historyTrx