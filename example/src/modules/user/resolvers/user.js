const { ApolloError } = require('apollo-server-express');
const { getMessage } = require('../../../utils/messages');
const logger = require('../../../logger');
const redis = require('redis');
const redisPort = 6379;
const client = redis.createClient(redisPort);

const user = async (_, args, ctx) => {
  try {

    const { models, req } = ctx;
    const {
      User: UserModel,
    } = models;
    const { user: userObj } = req;

    const userInstance = await UserModel.findByPk(userObj.id);
   
    if(userInstance)
    {
      const cacheData = client.get(userData) 
      if(cacheData)
      {
        console.log("chache Data =>>>>>>>>>>>", cacheData);
        return cacheData;
      }
    }
    else{
    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }
    client.setex(userData, 1440, JSON.stringify(userInstance));
    return userInstance;
  }
  } catch (error) {
    logger.error('ERROR WHILE FETCHING user>>>', error);
    throw error;
  }
};

module.exports = user;
