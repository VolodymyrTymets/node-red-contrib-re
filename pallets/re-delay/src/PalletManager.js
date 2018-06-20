const _ = require('lodash');
const { PalletManagerBase  } = require('../../../src/utils/PalletManagerBase');

/**
 * Provide class to help manage pallet
 *
 * **/
class PalletManager extends  PalletManagerBase{
  constructor(RED, palletConfig, node) {
    super(RED, palletConfig, node);

    this._self.interval = palletConfig.interval;
    this._self.value = palletConfig.value;
    this._self._getDelayInMilliseconds = this._getDelayInMilliseconds.bind(this._self);
    this.onInput = this.onInput.bind(this._self);
  }

  _getDelayInMilliseconds(interval, value) {
    const intervalMap = {
      'month': 30 * 24 * 60 * 1000,
      'day': 24 * 60 * 1000,
      'hour': 60 * 1000,
      'minute': 1000,
    };

    return (intervalMap[interval] || 0) * value;
  }

  /**
   * Provide on input event
   * to receive messages from the up-stream nodes in a flow
   * @params
   *       {object}
   * @return -> to return some message for next node in flow use
   *      this.send(msg);
   * **/
  onInput(msg) {
    try {
      const { interval, value } = this;
      const delay = this._getDelayInMilliseconds(interval, value);
      console.log('delay ->', delay);
      _.extend(msg.payload, { delay });
      this.send(msg);
      this._processSuccess('Delay is seated.');
    } catch (error) {
      console.log(error);
      this._processError(error);
      this.error(error);
    }
  }
}

module.exports = { PalletManager };
