var Group = require('../model/group');
var Message = require('../model/message');

Group.get = (id) => {
  return new Promise((resolve, reject) => {
    Group.findById(id, (err, group) => {
      if (err) reject(err);
      else resolve(group);
    });
  })
};

Group.list = () => {
  return new Promise((resolve, reject) => {
    Group.find((err, groups) => {
      if (err) {
        reject(err);
      } else {
        resolve(groups);
      }
    });
  });
};

Group.create = (title) => {
  let group = new Group({
    title: title,
    messages: []
  });

  return new Promise((resolve, reject) => {
    group.save((err, group) => {
      if (err) reject(err);
      else resolve(group);
    });
  })
};

Group.newTextMessage = (msgObj) => {
  return new Promise((resolve, reject) => {
    Group.get(msgObj.groupId)
      .then(group => {
        let message = new Message({
          from: msgObj.from,
          text: msgObj.text,
          date: msgObj.date
        });
        group.messages = [...group.messages, message];
        group.save((err) => {
          if (err) reject(err);
          else resolve(msgObj);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

Group.newFileMessage = (msgObj) => {

};

module.exports = Group;
