const express = require('express');
const logger = require('../../../logger');
const { Event, User, Invite } = require('../../../schema/index');
let result = {};

const list = async (req, res) => {
  const userId = req.user;
  const createdAt = req.body.createdAt;
  try {
    const events = await Event.findAll({
      limit: 5,
      offset: 0,
      sort: 'id',
      include: [{
        model: User, as: "user",
        attributes: ['firstName'],
        required: true,
        include: [{
          model: Invite, as: "invite",
          required: true,
          where: { inviteduserid: userId },
        }],
      }],
    })
    result.invited = events;
    logger.info("User is invited in event");
    const event = await Event.findAll({ userId, createdAt }, {
      limit: 5,
      offset: 0,
      sort: 'id',
    })
    result.GeneratedBY = event;
    logger.info("User's created event")
    res.json(result);
  }
  catch (err) {
    logger.error("list of event not display");
    res.json("list of event is not available");
  }
}

module.exports = list;