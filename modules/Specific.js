/**
 * Created by ben on 2/22/17.
 */
'use strict';

const
  Element = require('./Element'),
  h = require('./h');

class Specific extends Element {
  constructor(specific) {
    super(specific[h.META]);
  }

  get command_classes() {
    return this._cc;
  }

  set command_classes(cc) {
    this._cc = cc.split(',');
  }

  print() {
    return {
      [h.BASIC]: this[h.BASIC],
      [h.COMMAND_CLASSES]: this.command_classes,
      [h.KEY]: this[h.KEY],
      [h.LABEL]: this[h.LABEL]
    };
  }
}

module.exports = Specific;
