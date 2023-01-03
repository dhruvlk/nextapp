const logger = require("../../../logger");
const jwt = require('jsonwebtoken');
const { User } = require('../../../schema/index')

const refreshToken = async (req, res) => {
  try {
    const { email, refToken } = req.body;
    if (!(req.body)) {
      logger.error("Enter valid data");
    }
    const user = await User.findOne({ where: { email } });
    const decoded = jwt.decode(refToken, process.env.REF_SECRET);
    if (!(decoded.id === user.id)) {
      return res.json("Token is invalid");
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: process.env.TIME });
    // res.json("Token:", token);
    return res.status(200).json({ success: true, token });
  }
  catch (error) {
    logger.error("Error in refresh Token")
  }
}

module.exports = refreshToken;