const configDev = require('./config.dev');
const configProd = require('./config.prod');

const type = process.env.NODE_ENV;

const configs = {
  development: configDev.config,
  production: configProd.config,
};

const config = configs[type] || configs.development;

module.exports = { config };
