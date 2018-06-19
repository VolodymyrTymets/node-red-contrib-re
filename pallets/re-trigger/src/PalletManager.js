/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager {
  constructor(RED, palletConfig, node) {
    this._self = node;

    this._self.namespace = palletConfig.namespace;
    this._self.entity = palletConfig.entity;
    this._self.event = palletConfig.event;

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
    try {
      const { namespace, entity, event } = this;

      this.log('namespace ->', namespace);

      msg.payload = { status: 200 };
      this.send(msg);
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = { PalletManager };
