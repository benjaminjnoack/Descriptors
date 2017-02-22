/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  Element = require('./Element'),
  h       = require('./h');

class Item extends Element {
  constructor(item) {
    super(item[h.META]);
  }

  get meta() {
    return {
      label: this.label,
      value: this.value
    };
  }

  set meta(meta) {
    super.meta = meta;
  }

  print() {
    return this.meta;
  }
}

module.exports = Item;
