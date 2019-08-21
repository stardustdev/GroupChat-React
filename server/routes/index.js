var express = require('express');
var Account = require('../dao/account');
var response = require('../util.js/response');
var config = require('../config');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

const app = express();

app.post('/login', (req, res) => {
    var params = req.body;
    Account.login(params.username, params.password)
        .then((data) => {
            response.success(res, { uInfo: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/signup', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.failure(res, err);
        } else {
            var { username, password, email } = fields;
            var { avatar } = files;

            var avatarName = 'no_avatar.gif';
            if (avatar && avatar.size > 0) {
                avatarName = path.basename(avatar.path);
                fs.copyFileSync(avatar.path, config.get("repos:avatar") + '/' + avatarName);
            }

            Account.register(username, password, email, avatarName)
                .then(data => {
                    response.success(res, { uInfo: data });
                })
                .catch(err => {
                    response.failure(res, err);
                });
        }
    });
});

module.exports = app;