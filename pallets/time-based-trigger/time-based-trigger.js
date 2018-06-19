module.exports = function(RED) {
    function TimeBasedTrigger(config) {
        RED.nodes.createNode(this, config);

        this.interval = config.interval;
        this.at = config.at;
        const node = this;

        node.on('change', function(msg) {

        });
    }
    RED.nodes.registerType('time-based-trigger', TimeBasedTrigger);
};