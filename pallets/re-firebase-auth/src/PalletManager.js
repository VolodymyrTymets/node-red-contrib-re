const _ = require('lodash');
const firebase = require('firebase');
const { PalletManagerBase  } = require('../../../src/utils/PalletManagerBase');
/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager extends PalletManagerBase {
  constructor(RED, palletConfig, node, appConfig) {
    super(RED, palletConfig, node);

    this._self.email = palletConfig.email || '';
    this._self.password = palletConfig.password || '';

    this._firebase = firebase;
    try {
      this._firebase.initializeApp(appConfig.firebase);
    } catch (error) {
      console.log('RE-firebase-auth constructor catch error:');
      console.log(error);
    }

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
    const { email, password } = this;
    this._process('Authorizing...');
    firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
      const userName = _.get(user, 'displayName') || _.get(user, 'email');
      this._processSuccess(`successfully logged as. ${userName}`);

      const credentials = user.toJSON().stsTokenManager;
      this.context().flow.set('firebase-credentials', credentials);
      this.extendMsgPayload(msg, { credentials });
      this.send(msg);
    }).catch(this._processError)
  }
}

module.exports = { PalletManager };
