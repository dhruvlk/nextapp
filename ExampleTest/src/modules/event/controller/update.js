const express = require('express');
const logger = require('../../../logger');
const { Event } = require('../../../schema/index');
let result = {};

const up = async (req, res) => {
  const userId = req.user;
  const { eventname, newevent } = req.body;
  try {
    if (!(eventname, newevent)) {
      logger.error("Data is not entered");
      res.send("Please give required data");
    }
    const Events = await Event.findAll({
      where: {
        eventname, userId
      }
    })
    logger.info("Event is found");
    const event = await Event.update({ eventname: newevent }, { where: { eventname } });
    logger.info("Event is updated");
    res.json("Event is updated");
  }
  catch (err) {
    logger.error("Event is not updated");
    res.json("Event is not updated");
  }
}

module.exports = up;