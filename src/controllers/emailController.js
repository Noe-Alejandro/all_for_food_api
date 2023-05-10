const { request, response } = require('express');
const nodeMailer = require('nodemailer');
const { nodemailerConf } = require('../configs/config');
require('dotenv').config();
const { success, error } = require("../utils/helpers/baseResponse");
const statusCode = require('../utils/helpers/statusCode');

const sendEmail = (req = request, resp = response) => {
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: nodemailerConf.host,
        post: nodemailerConf.port,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSWORD
        }
    });

    const options = {
        from: nodemailerConf.from,
        subject: body.subject,
        to: body.email,
        html: '<p>' + body.message + '</p>',
    };

    return config.sendMail(options, function (err, result) {
        if (err) {
            return resp
                .status(statusCode.InternalServerError)
                .json(error(err, statusCode.InternalServerError));
        }
        resp
            .status(statusCode.OK)
            .json(success("Correo enviado", result, statusCode.OK));
    });
}

module.exports = { sendEmail };
