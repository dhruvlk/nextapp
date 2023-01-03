const logger = require('../../../logger');
const { Event, User, Invite } = require('../../../schema/index');
const fetch = require('node-fetch');
const moment = require('moment');
const { duration } = require('moment');
let result = {};
let i = 0;
let whurl;
let msg;

const invited = async (req, res) => {
    const userId = req.user;
    const eventId = req.body.eventId;
    const email = req.body.email;
    try {
        if (!(eventId, email)) {
            logger.error("Data is not entered");
            res.send("Please give required data");
        }
        const events = await Event.findAll({ where: { userId } })
        result.events = events;
        logger.info("Events are fetch");
        const invi = await Event.findAll({
            include: [{
                model: Invite, as: 'invite',
                where: { inviteduserid: "userId" }
            }],
        });
        result.event = invi;

        const eventObj = await Event.findOne({ where: { id: eventId } });
        for (i = 0; i < req.body.email.length; i++) {
            const email = req.body.email[i];
            const user = await User.findOne({ where: { email } })
            const inviteduserid = user.id;
            await Invite.create({ inviteduserid, userId, eventId })
            whurl = user.webhookLink;
            msg = {
                "content": `hello! You are invited in ${eventObj.eventname} event`
            }
            fetch(whurl, { "method": "POST", "headers": { "content-type": "application/json" }, "body": JSON.stringify(msg) })
        }
        for (i = 0; i < req.body.email.length; i++) {
            const email = req.body.email[i];
            const user = await User.findOne({ where: { email } })
            whurl = user.webhookLink;
            const dateTime = moment(eventObj.scheduled);
            const date = dateTime.format('YYYY-MM-DD');
            const time = dateTime.format('HH:mm');
            const delay = moment(eventObj.notificationDelay);
            const delayTime = delay.format('HH:mm');
            // if (date == moment().format('YYYY-MM-DD')) {
            // const timenew = moment(time, 'HH:mm');
            // const endtime = moment(delayTime, 'HH:mm');
            // var hoursDiff = endtime.diff(timenew, 'hours');
            // console.log(hoursDiff);
            // var minuteDiff = endtime.diff(timenew, 'minutes');
            // console.log(minuteDiff);
            const notifyTime = time - delayTime;
            console.log(notifyTime);

            // msg = {
            //     "content": `hello! It's a reminder for you ! You are invited in ${eventObj.eventname} event`
            // }
            // fetch(whurl, { "method": "POST", "headers": { "content-type": "application/json" }, "body": JSON.stringify(msg) })
            // }

        }
        logger.info("Invite is created");
        logger.info("Show events");
        res.json(result);
    }
    catch (err) {
        logger.error("Invite is not created and event is not found");
        res.json("Event is not found");
    }
}

module.exports = invited;