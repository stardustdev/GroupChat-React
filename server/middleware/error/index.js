const handler = (stackTrace) => (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: stackTrace?err:{}
    });
};

module.exports = handler;
