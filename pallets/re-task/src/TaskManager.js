
/**
 * Provide class to help manage pallet
 *
 * **/

class TaskManager {
  constructor(node) {
    this._node  = node;
    this.testTask = this.testTask.bind(this);
  }

  testTask(job, done) {
    console.log('I am Task');
    this._node.log('I am Task');
    done();
  }
}

module.exports = { TaskManager };
