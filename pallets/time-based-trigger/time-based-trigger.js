//const { PalletManager } = require('../re-trigger/src/PalletManager');
const  MODULE_NAME = 'time-based-trigger';

module.exports = function(RED) {
    function nodeGo(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        //const palletManager = new PalletManager(RED, config, node);

        node.on('input', () => {});
    }

    RED.nodes.registerType(MODULE_NAME, nodeGo);
};