const express = require('express');
const logger = require('../../../logger');
const { Event, Invite } = require('../../../schema/index');
let result = {};

const spec = async (req, res) => {
  const userId = req.user;
  const eventname = req.params.eventname;
  try {
    if (!(eventname)) {
      logger.error("Eventname is required");
      res.json("Eventname is required");
    }
    const events = await Event.findAll({
      include: [{
        model: Invite, as: "invite",
        required: true,
      }],
      where: {
        eventname, userId
      }
    })
    logger.info("Event is found");
    res.json(events);
  }
  catch (err) {
    logger.error("Event is not found");
    res.json("Event is not found");
  }
}

module.exports = spec;