const { TaskManager } = require('./TaskManager');
const { PalletManagerBase  } = require('../../../src/utils/PalletManagerBase');
const kue = require('kue');

/**
 * Provide class to help manage pallet
 *
 * **/

class PalletManager extends PalletManagerBase {
  constructor(RED, palletConfig, node) {
    super(RED, palletConfig, node);

    this._self.namespace = palletConfig.namespace;
    this._self.entity = palletConfig.entity;
    this._self.event = palletConfig.event;

    const taskQueue = node.context().global.get('taskQueue') || kue.createQueue();
    node.context().global.set('taskQueue', taskQueue);

    this.onInput = this.onInput.bind(this._self);
    this._self._getQueue = this._getQueue.bind(this._self);
  }

  _getQueue(){
    return this.context().global.get('taskQueue');
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
      const { delay } = msg.payload;

      const taskManager = new TaskManager(this);
      const NAME = 'test_task';

      // Individual task-ID
      // Name of the node
      // Time when the trigger was triggered
      // Time when the task was created
      // Created by Event XYZ
      // Input params of the node
      const taskPayload = {
        nodeName: '',
        triggerTimestamp: new Date().getTime(),
        taskTimestamp: new Date().getTime(),
        CreatedByEvent: {},
        params: {}
      };

      this._getQueue().process(NAME, taskManager.testTask);
      let job = this._getQueue().create(NAME, taskPayload);

      if(delay) {
        job = job.delay(delay);
      }

      job.save((err) => {
        if(err) {  return this._processError(err) };
        this.send(msg);
        return this._process('Added to queue');
      });
    } catch (error) {
      console.log(error);
      return this._processError(error);
    }
  }
}

module.exports = { PalletManager };
