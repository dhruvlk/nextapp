require('dotenv').config();
let port = require('./config/config')
port = port.PORT
const express = require('express');
const app = express();
const router = express.Router();
const logger = require('./logger');
const modules = require('./modules/index');
const { sequelize } = require('./schema/index');
const rateLimit = require('express-rate-limit');
const apiRequestLimiter = rateLimit({
  windowsMs: 1 * 60 * 1000,
  max: 5,
  message: "Your limit exceeded"
})

app.use(apiRequestLimiter)
app.use(express.json());
app.use('/', modules);

sequelize.authenticate().then(() => {
  logger.info('Connection has been established successfully.');
}).catch(err => {
  logger.error('Unable to connect to the database:' + err);
})
sequelize.sync().then(() => {
  app.listen(port);
  console.log(`Server up on http://localhost:${port}`)
}).catch(err => logger.error('error:'));

