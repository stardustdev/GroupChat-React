var MD5 = require('md5.js');
var Account = require('../model/account');

Account.list = () => {
  return new Promise((resolve, reject) => {
    Account.find((err, accounts) => {
      if (err) {
        reject(err);
      } else {
        resolve(accounts);
      }
    });
  });
};

Account.login = (username, password) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ username: username, password: password }, (err, account) => {
      if (err || !account) {
        reject(err);
      } else {
        let seed = username + new Date().getTime();
        account.oauthToken = new MD5().update(seed).digest('hex');
        account.save(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(account);
          }
        })
      }
    });
  });
};

Account.register = (username, password, email, avatarName) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ username: username }, (err, account) => {
      if (err) reject(err);
      else if (account) {
        reject(new Error('duplicated username'));
      } else {
        let account = new Account({
          username,
          password,
          email,
          avatarName,
          oauthToken: null,
          favoriteGroupIds: []
        });
        account.save((err) => {
          if (err) reject(err);
          else resolve(account);
        })
      }
    });
  });
};

Account.getInfo = (oauthToken) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ oauthToken: oauthToken }, (err, account) => {
      if (err) reject(err);
      else if (!account) reject(new Error('Invalid oauthToken'));
      else resolve(account);
    })
  })
};

module.exports = Account;
