/**
 * Created by ben on 2/17/17.
 */
'use strict';

const Value = require('./Value');

const
  ID    = 'id',
  META  = '$',
  VALUE = 'Value';

class CommandClass {
  constructor(cc) {
    this.id = cc[META];
    this.values = cc[VALUE];
  }

  get id() {
    return this._id;
  }

  set id(meta) {
    this._id = parseInt(meta[ID]);
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
