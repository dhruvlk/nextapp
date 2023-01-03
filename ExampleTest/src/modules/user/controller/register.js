const bcrypt = require('bcryptjs');
const logger = require('../../../logger');
const { User } = require('../../../schema/index');

const add = async (req, res) => {
	const { firstName, lastName, email, password, webhookLink } = req.body;
	try {
		if (!(firstName, lastName, email, password, webhookLink)) {
			logger.error("Data is not entered");
			res.json("Please give required data");
		}
		const user = await User.findOne({ where: { email } });
		console.log(user);
		if (user) {
			res.json("User is already exists");
		}
		bcrypt.hash(password, 10, async (err, encrypt) => {
			if (err) {
				logger.error("Password is not encrypted");
			}
			const user = await User.create({ firstName, lastName, email, password: encrypt, webhookLink })
			logger.info("User is created");
			res.json(user);
		})
	}
	catch (err) {
		logger.error("User is not created");
		res.json("Registration is not done");
	}
}

module.exports = add;