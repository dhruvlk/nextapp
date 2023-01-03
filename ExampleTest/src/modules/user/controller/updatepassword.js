const { User } = require('../../../schema/index');
const bcrypt = require('bcryptjs');
const logger = require('../../../logger');


const updatePass = async (req, res) => {
	const { id, password } = req.body;
	try {
		if (!(id, password)) {
			logger.error("Data is not entered");
			res.send("Please give required data");
		}
		const user = await User.findOne({ where: { id } });
		if (user) {
			bcrypt.hash(password, 10, (err, encrypt) => {
				if (err) {
					logger.error("Password is not encrypted");
					res.json("Password is not encrypted");
				}
				const users = User.update({ password: encrypt }, { where: { id } });
				logger.info("Password is updated");
				res.json("Password is updated");
			}
			)
		}
	}
	catch (err) {
		logger.error("Password can not be updated" + err);
		res.json("Password is not updated");
	}
}

module.exports = updatePass;
