const { User } = require('../../../schema/index');
var logger = require('../../../logger');

const signout = async (req, res) => {
    try {
        logger.info("Logout successful");
        res.json("Successfully logout");
    }
    //}
    catch (err) {
        logger.error("User cann't logout" + err);
        res.json("User is not logout");
    }
}

module.exports = signout;