/**
 * Created by ben on 2/21/17.
 */
'use strict';

const h = require('./h');

class Item {
  constructor(item) {
    this.meta = item[h.META];
  }

  get meta() {
    return {
      label: this.label,
      value: this.value
    };
  }

  set meta(meta) {
    this[h.LABEL] = meta[h.LABEL];
    this[h.VALUE] = meta[h.VALUE];
  }

  print() {
    return this.meta;
  }
}

module.exports = Item;
