const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    format.json(),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;