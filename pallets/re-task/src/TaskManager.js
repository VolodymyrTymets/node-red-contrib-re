
/**
 * Provide class to help manage pallet
 *
 * **/

class TaskManager {
  constructor(node) {
    this._node = node;
    this.testTask = this.testTask.bind(this);
  }

  testTask(job, done) {
    this._node.log('I am Task');
    // todo: move all messages to single file
    this._node._processSuccess('Task is processed successfully.');
    done();
  }
}

module.exports = { TaskManager };
