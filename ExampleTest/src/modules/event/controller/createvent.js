const logger = require('../../../logger');
const { Event } = require('../../../schema/index');

const generate = async (req, res) => {
  const userId = req.user;
  const eventname = req.body.eventname;
  const scheduled = req.body.scheduled;
  const notificationDelay = req.body.notificationDelay;
  try {
    if (!(eventname, scheduled, notificationDelay)) {
      logger.error("Event name is required");
      res.json("Eventname is required");
    }
    const event = await Event.create({ eventname, userId, scheduled, notificationDelay });
    logger.info("Event is created");
    res.json(event);
  }
  catch (err) {
    logger.error("Event is not created");
    res.json("Event is not created");
  }
}

module.exports = generate;
