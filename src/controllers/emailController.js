const { request, response } = require('express');
const nodeMailer = require('nodemailer');
const { nodemailerConf } = require('../configs/config');
require('dotenv').config();
const { success, error } = require("../utils/helpers/baseResponse");
const statusCode = require('../utils/helpers/statusCode');

/**
 * Envia un email para el servicio al cliente
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns confirmación del envió del correo
 */

const sendEmailToService = (req = request, resp = response) => {
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: nodemailerConf.host,
        post: nodemailerConf.port,
        auth: {
            user: process.env.USERMAIL_HELP,
            pass: process.env.PASSWORD_HELP
        }
    });

    const options = {
        from: nodemailerConf.from,
        subject: body.subject,
        to: "allforfood.service@gmail.com",
        html: '<p>' + body.message + '</p><br><p>Enviado por ' + body.name + ' con el correo de ' + body.from + '</p>',
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

module.exports = { sendEmailToService };
