/**
 * Created by ben on 2/17/17.
 */
'use strict';

const
  Element = require('./Element'),
  h       = require('./h'),
  Value   = require('./Value');

class CommandClass extends Element {
  constructor(cc) {
    super(cc[h.META]);

    this.values = cc[h.VALUE];
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = parseInt(id);
  }

  get values() {
    return this._values || [];
  }

  set values(values) {
    this._values = values;
  }

  parse() {
    this.values = this.values.map(value => {
      value = new Value(value);
      value.parse();
      return value;
    });
  }

  print() {
    let values = this.values.map((value) => {
      return value.print();
    });

    return {
      id: this.id,
      values: values
    };
  }
}

module.exports = CommandClass;
