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
  this._self._getCronString = this._getCronString.bind(this._self);
  this.onInput = this.onInput.bind(this._self);
  }

  _getCronString(interval, value) {
    switch (interval) {
      case 'monthly':
        return `***/${value}**`;
      case 'weekly':
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `*****/${days.findIndex(day => day === value)}`;
      case 'daily':
        return `**/${value}***`;
    }
  }

  /**
   * Provide on input event
   * to receive messages from the up-stream nodes in a flow
   * @params
   *      {object}
   * @return -> to return some message for next node in flow use
   *      this.send(msg);
   * **/
  onInput(msg) {
    try {
      const { interval, value } = this;
      const delay = this._getCronString(interval, value);

      msg.payload = msg.payload || {};
      _.extend(msg.payload, { delay });

      this.send(msg);
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = { PalletManager };
