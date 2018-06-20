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
    this._getDelayInMilliseconds = this._getDelayInMilliseconds.bind(this._self);
    this._getNextWeekDay = this._getNextWeekDay.bind(this._self);
    this.onInput = this.onInput.bind(this._self);
  }

  _getNextWeekDay (startDate, dayOfWeek){
    const dayOffset = dayOfWeek > startDate.getDay()
        ? dayOfWeek - startDate.getDay()
        : dayOfWeek - startDate.getDay() + 7;

    startDate.setDate(startDate.getDate() + dayOffset);

    return startDate;
  }

  _getDelayInMilliseconds(interval, value) {
      const now = new Date();
      const intervalMap = {
          'monthly': 30 * 24 * 60 *1000,
          'weekly': () => {
              switch (value) {
                  case 'Monday': return this._getNextWeekDay(new Date(),1).getTime() - now; // 0 = Sunday, 1 = Monday - new Date() = miliseconds left
                  case 'Tuesday': return this._getNextWeekDay(new Date(),2).getTime() - now;
                  case 'Wednesday': return this._getNextWeekDay(new Date(),3).getTime() - now;
                  case 'Thursday': return this._getNextWeekDay(new Date(),4).getTime() - now;
                  case 'Friday': return this._getNextWeekDay(new Date(),5).getTime() - now;
                  case 'Saturday': return this._getNextWeekDay(new Date(),6).getTime() - now;
                  case 'Sunday': return this._getNextWeekDay(new Date(),7).getTime() - now;
              }
          },
          'daily': 24 * 60 * 1000,
      };

      return isNaN(value) ? intervalMap[interval] : ((intervalMap[interval] || 0) * value);
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
          const {interval, atInput} = this;
          const delay = this._getDelayInMilliseconds(interval, value);

          _.extend(msg.payload, {delay});
          this.send(msg);
      } catch (error) {
          this.error(error);
      }
  }
}

module.exports = { PalletManager };
