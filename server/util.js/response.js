const success = (res, data) => {
  res.json({ success: 1, data: data });
}

const failure = (res, message) => {
  res.json({ success: 0, message: message });
}

module.exports = { success, failure };