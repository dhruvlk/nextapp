const { User } = require('../../../schema/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../../../logger');

const signin = async (req, res) => {
	const { email, password } = req.body;
	let result = {};
  console.log("Model->>>>>>>>>", User)
	try {
		if (!(email, password)) {
			logger.error("Data is not entered");
			res.send("Please give required data");
		}
		const user = await User.findOne({ where: { email } })
		if (!user) {
			logger.error("User is not found");
			return res.json("User is not found");
		}
		bcrypt.compareSync(password, user.password)
		const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: process.env.TIME });
		const refreshToken = jwt.sign({ id: user.id }, process.env.REF_SECRET, { expiresIn: process.env.REF_TIME });
		result.token = token;
		result.refreshToken = refreshToken;
		result.result = user;
		logger.info("User login sucessfully");
		res.json(result);
	}
	catch (err) {
		logger.error("User can't be login " + err);
		res.json("User is not  login ");
	}
}

module.exports = signin;
