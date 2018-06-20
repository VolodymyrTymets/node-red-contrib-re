/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManagerBase {
  constructor(RED, palletConfig, node) {
    this._self = node;

    this._self._processError = this._processError.bind(this._self);
    this._self._processSuccess = this._processSuccess.bind(this._self);
    this._self._process = this._process.bind(this._self);
  }

  _processError(err) {
    const message  = typeof err === 'string' ? err : err.message;
    this.error(message);
    this.status({ fill:"red", shape:"dot", text: message});
  }
  _processSuccess(message) {
    this.status({ fill:"green", shape:"dot", text: message });
  }
  _process(message, fill = 'grey', shape = "dot") {
    this.status({ fill, shape, text: message });
  }
}

module.exports = { PalletManagerBase };
