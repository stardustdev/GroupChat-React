"use strict";

var nconf = require("nconf");
var path = require("path");
var rootPath = path.normalize(__dirname + '/../..');

nconf.file({ file: path.join(__dirname, "conf.json") });

function get(configItem) {
    var envVarName = configItem.replace(/:/g, "_");
    var value = process.env[envVarName.toUpperCase()];

    if (!value) {
        value = nconf.get(configItem);
    }

    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return value;
    }
}

function getMany() {
    var envVarNames = Array.prototype.slice.apply(arguments);
    var configs = {};

    for (var i = 0; i < envVarNames.length; i++) {
        configs[envVarNames[i]] = get(envVarNames[i]);
    }

    return envVarNames.length ? configs : null;
}

exports.get = get;
exports.getMany = getMany;
exports.rootPath = rootPath;