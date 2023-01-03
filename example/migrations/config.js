const CONFIG = require('../config/config');

const env = CONFIG.env || 'development';
const username = CONFIG.db.user;
const { password } = CONFIG.db;
const database = CONFIG.db.name;
const { host } = CONFIG.db;
const { port } = CONFIG.db;
const dialect = 'postgres';

module.exports = {
  [env]: {
    dialect,
    username,
    password,
    database,
    host,
    port,
    migrationStorageTableName: '_migrations',
  },
};

