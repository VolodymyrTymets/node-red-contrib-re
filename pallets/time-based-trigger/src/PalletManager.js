const _ = require('lodash');
/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager {
  constructor(RED, palletConfig, node) {
    this._self = node;

    this._self.interval = palletConfig.interval;
    this._self.at = palletConfig.at;

    this.onInput = this.onInput.bind(this._self);
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
      console.log('ON INPUT');
      try {
          const {interval, atInput} = this;

          const trigger = {interval, atInput};

          // todo: extend logic here
          // if(payloadEvent &&
          //   payloadEvent.namespace === namespace &&
          //   payloadEvent.entity === entity) {

          _.extend(msg.payload, {trigger});
          console.log(msg.payload);
          this.send(msg);
          // } else {
          //   this.warn('no trigger was found');
          // }

      } catch (error) {
          this.error(error);
      }
  }
}

module.exports = { PalletManager };
