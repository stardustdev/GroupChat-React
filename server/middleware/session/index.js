var Account = require('../../dao/account');

const auth = (req, res, next) => {
  const oauthToken = req.header('oauthToken');

  if (!oauthToken) {
    let err = new Error('Forbidden');
    err.status = 403;
    next(err);
  } else {
    Account.getInfo(oauthToken)
      .then((uInfo) => {
        req.uInfo = uInfo;
        next();
      })
      .catch(err => {
        err.status = 403;
        next(err);
      });
  }
};

module.exports = auth;
