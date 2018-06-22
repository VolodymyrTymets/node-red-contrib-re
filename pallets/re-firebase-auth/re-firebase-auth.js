const { PalletManager } = require('./src/PalletManager');
const appConfig = require('../../config');
const  MODULE_NAME = 'RE-firebase-auth';

module.exports = function(RED) {
  'use strict';
  function nodeGo(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const palletManager = new PalletManager(RED, config, node, appConfig.config);

    node.on('input', palletManager.onInput);
  };

  RED.nodes.registerType(MODULE_NAME, nodeGo);
};
