/**
 * Created by ben on 2/22/17.
 */
'use strict';

const
  Element = require('./Element'),
  h = require('./h'),
  Specific = require('./Specific');

class Generic extends Element {
  constructor(generic) {
    super(generic[h.META]);

    if (generic[h.SPECIFIC_CLASS])
      this.specific = generic[h.SPECIFIC_CLASS];
  }

  get command_classes() {
    return this._cc;
  }

  set command_classes(cc) {
    this._cc = cc.split(',');
  }

  get specific() {
    return this._specific;
  }

  set specific(specific) {
    this._specific = specific.map((specific) => {
      return new Specific(specific);
    });
  }

  print() {
    let print = {
      [h.BASIC]: this[h.BASIC],
      [h.COMMAND_CLASSES]: this.command_classes,
      [h.KEY]: this[h.KEY],
      [h.LABEL]: this[h.LABEL]
    };

    if (this.specific)
      print['specific_classes'] = this.specific.map(s => { return s.print(); });

    return print;
  }
}

module.exports = Generic;
