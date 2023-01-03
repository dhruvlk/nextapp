const { PubSub } = require('apollo-server-express');

const pubSub = new PubSub();

const pubSubTopics = {
  COMMENT_ADDED: 'COMMENT_ADDED',
  NOTIFICATION: 'NOTIFICATION',
};

module.exports = { pubSub, pubSubTopics };
