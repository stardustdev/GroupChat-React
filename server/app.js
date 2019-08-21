var SourceMapSupport = require('source-map-support');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');
var mongoose = require('mongoose');
var Group = require('./dao/group');
var cors = require('./middleware/cors');
var errorHandler = require('./middleware/error');

var v1 = require('./routes/v1');

const app = express();
const basePort = process.env.PORT || config.get('port');

SourceMapSupport.install();

const setMiddleware = () => {
  app.use(cors('*'));
  app.use(methodOverride());
  app.use(bodyParser.json());

  const version = config.get('api:version')
  app.use(`/groupchat-api/${version}`, v1);

  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 400;
    next(err);
  });

  app.use(errorHandler(app.get('env') !== 'production'));
}

const connectMongoDB = () => {
  const conUrl = config.get('db:connection');
  mongoose.connect(conUrl, config.get('db:options'), function (mongooseError) {
    if (mongooseError) {
      console.log(mongooseError);
      return;
    }
    console.log(`> MongoDB connected at ${conUrl}`);
    setMiddleware();
  });
};

const startServer = (basePort) => {
  connectMongoDB();

  return new Promise((resolve, reject) => {
    let server = app.listen(basePort, (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const uri = `http://localhost:${basePort}`;
      console.log(`> Listening at ${uri}\n`);
      resolve(server);
    });
  });
};

const startSignalingServer = (server) => {
  var WebSocketServer = require('ws').Server;
  var wss = new WebSocketServer({ server: server, path: '/groupchat-ws/' });
  var onlineUsers = [];

  var logout = (uInfo) => {
    if (uInfo == null) return;
    wss.broadcast({ type: 'outgoing', uInfo: { ...uInfo } });
    let idx = onlineUsers.indexOf(uInfo);
    if (idx != -1) onlineUsers.splice(idx, 1);
  };

  wss.broadcast = data => {
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  wss.on('connection', function (ws) {
    let uInfo = null;
    ws.on('message', data => {
      let msgObj = JSON.parse(data);
      let result = null;
      switch (msgObj.type) {
        case 'handshake':
          if (msgObj.uInfo == null) break;
          uInfo = { ...msgObj.uInfo };
          let user = onlineUsers.find(user => user.username == uInfo.username);
          if (!user) onlineUsers.push(uInfo);
          ws.send(JSON.stringify({ type: 'online', onlineUsers: onlineUsers }));
          wss.broadcast({ type: 'incoming', uInfo: uInfo });
          break;

        case 'text':
          msgObj = { ...msgObj, from: uInfo };
          result = Group.newTextMessage(msgObj);
          break;

        case 'file':
          msgObj = { ...msgObj, from: uInfo };
          result = Group.newFileMessage(msgObj);
          break;

        case 'logout':
          logout(msgObj.uInfo);
          break;

        default:
      }

      if (result) {
        result
          .then(message => {
            console.log('broadcasting...', message);
            wss.broadcast(message);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    ws.on('close', () => {
      logout(uInfo);
    });
  });
};


startServer(basePort)
  .then(server => {
    startSignalingServer(server);
  });