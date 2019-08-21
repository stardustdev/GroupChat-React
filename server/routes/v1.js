var routes = require('../routes');
var groups = require('../routes/groups');
var accounts = require('../routes/accounts');

var express = require('express');
const app = express();

app.use('/', routes);
app.use('/account', accounts);
app.use('/group', groups);

module.exports = app;
