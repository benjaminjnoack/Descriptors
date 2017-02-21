/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  LABEL = 'label',
  META  = '$',
  VALUE = 'value';

class Item {
  constructor(item) {
    this.meta = item[META];
  }

  get meta() {
    return {
      label: this.label,
      value: this.value
    };
  }

  set meta(meta) {
    this[LABEL] = meta[LABEL];
    this[VALUE] = meta[VALUE];
  }

  print() {
    return this.meta;
  }
}

module.exports = Item;
