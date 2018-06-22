const _ = require('lodash');
const {PalletManagerBase} = require('../../../src/utils/PalletManagerBase');

/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager extends PalletManagerBase {
  constructor(RED, palletConfig, node) {
    super(RED, palletConfig, node);

  this._self.value = palletConfig.value;
  this._self.operator = palletConfig.operators;
  this._self.secondValue = palletConfig.secondvalue;
  this._getFilteredValues = this._getFilteredValues.bind(this._self);
  this.onInput = this.onInput.bind(this._self);
  }

  // _getFilteredValues(value, operator, b, a) {
  //   switch (value) {
  //     case 'strings': {
  //       switch (operator) {
  //         case 'is': return (a, b) => a == b;
  //         case 'is not': return (a, b) => a != b;
  //         case 'contains': return (a, b) => (a + "").indexOf(b) != -1;
  //         case 'does not contain': return (a, b) => (a + "").indexOf(b) == -1;
  //         case 'is empty': return  a => a === false;
  //         case 'not empty': return a => a === true;
  //         case 'starts with': return;
  //         case 'ends with': return;
  //       }
  //     }
  //     case 'booleans': {
  //       switch (operator) {
  //         case 'is true': return
  //       }
  //     }
  //   }
  // }

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
      const firstValue = msg.payload;
      const {value, operator, secondValue} = this;
      const payload = this._getFilteredValues(value, operator, secondValue, firstValue);

      _.extend(msg.payload, {payload});
      this.send(msg);
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = {PalletManager};
