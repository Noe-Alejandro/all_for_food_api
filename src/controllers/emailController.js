const {request, response} = require('express');
const nodeMailer = require('nodemailer');

const sendEmail = (req = request, resp = response)=>{
    let body = req.body;


    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'allforfood.service@gmail.com',
            pass: 'jsittnhadizexlmh'
        }
    });

    const options = {
        from: 'All For Foods',
        subject: body.subject,
        to: body.email,
        html: '<p>' + body.message + '</p>',
    };

    console.log(config);

    config.sendMail(options,function(error,result){
        if(error) return resp.json({
            ok: false,
            msg: error
        });
        return resp.json({
            ok: true,
            msg: result
        });
    });
}

module.exports = {sendEmail};
