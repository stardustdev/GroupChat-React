var express = require('express');
var Group = require('../dao/group');
var response = require('../util.js/response');
var auth = require('../middleware/session');
const app = express();

app.post('/', auth, (req, res) => {
  let title = req.body.title;
  Group.create(title)
    .then((data) => {
      response.success(res, { group: data });
    })
    .catch(err => {
      response.failure(res, err);
    });
});

app.get('/list', auth, (req, res) => {
  Group.list()
    .then((data) => {
      response.success(res, { groups: data });
    })
    .catch(err => {
      response.failure(res, err);
    });
});

app.get('/:id/messages', auth, (req, res) => {
  Group.get(req.params.id)
    .then(group => {
      response.success(res, { messages: group.messages });
    })
    .catch(err => {
      response.failure(res, err);
    });
});

module.exports = app;