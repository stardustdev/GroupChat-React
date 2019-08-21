var express = require('express');
var Account = require('../dao/account');
var response = require('../util.js/response');
var auth = require('../middleware/session');
var config = require('../config');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const app = express();

app.get('/list', auth, (req, res) => {
  Account.list()
    .then((data) => {
      response.success(res, { accounts: data });
    })
    .catch(err => {
      response.failure(res, err);
    });
});

app.post('/update', auth, (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      response.failure(res, err);
    } else {
      var { username, email } = fields;
      var { avatar } = files;

      req.uInfo.username = username;
      req.uInfo.email = email;
      if (avatar && avatar.size > 0) {
        var avatarName = path.basename(avatar.path);
        fs.copyFileSync(avatar.path, config.get("repos:avatar") + '/' + avatarName);
        req.uInfo.avatarName = avatarName;
      }

      req.uInfo.save((err, newUserInfo) => {
        if (err) response.failure(res, err);
        else response.success(res, { uInfo: newUserInfo });
      })
    }
  });
});

app.post('/changepwd', auth, (req, res) => {
  const { oldPwd, newPwd } = req.body;
  if (req.uInfo.password != oldPwd) response.failure(res, new Error('Old password is incorrect.'));
  else {
    req.uInfo.password = newPwd;
    req.uInfo.save((err, newUserInfo) => {
      if (err) response.failure(res, err);
      else response.success(res, { uInfo: newUserInfo });
    });
  }
});

app.get('/favorite/:isFavorite/:groupId', auth, (req, res) => {
  const { isFavorite, groupId } = req.params;

  const uInfo = req.uInfo;
  if (parseInt(isFavorite)) {
    if (uInfo.favoriteGroupIds.indexOf(groupId) != -1) {
      response.success(res, { uInfo });
    } else {
      uInfo.favoriteGroupIds = [...uInfo.favoriteGroupIds, groupId];
      uInfo.save((err, newInfo) => {
        if (err) response.failure(res, err);
        else response.success(res, { uInfo: newInfo });
      })
    }
  } else {
    if (uInfo.favoriteGroupIds.indexOf(groupId) == -1) {
      response.success(res, { uInfo });
    } else {
      uInfo.favoriteGroupIds = uInfo.favoriteGroupIds.filter(fGroupId => fGroupId != groupId);
      uInfo.save((err, newInfo) => {
        if (err) response.failure(res, err);
        else response.success(res, { uInfo: newInfo });
      })
    }
  }
});

module.exports = app;