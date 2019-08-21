const cors = origin => (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, oauthToken');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};

module.exports = cors;
