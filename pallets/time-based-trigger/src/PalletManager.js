const _ = require('lodash');
/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager {
  constructor(RED, palletConfig, node) {
    this._self = node;

    this._self.interval = palletConfig.interval;
    this._self.value = palletConfig.value;
    this._getCronString = this._getCronString.bind(this._self);
    this.onInput = this.onInput.bind(this._self);
  }

    _getCronString(interval, value) {
      let cronsString = '';
      switch (interval) {
          case 'monthly': {
              cronsString = `***/${value}**`;
              break;
          }
          case 'weekly': {
              const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              for (let day of days) {
                  if (day === value) {
                      cronsString = `*****/${days.indexOf(day)}`;
                  }
              }
              break;
          }
          case 'daily': {
              cronsString = `**/${value}***`;
              break;
          }
      }
      return cronsString;
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
          const {interval, value} = this;
          const delay = this._getCronString(interval, value);

          _.extend(msg.payload, {delay});
          this.send(msg);
      } catch (error) {
          this.error(error);
      }
  }
}

module.exports = { PalletManager };
