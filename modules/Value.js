/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  h     = require('./h'),
  Item  = require('./Item');

class Value {
  constructor(value) {
    this.help = value[h.HELP];
    this.items = value[h.ITEM];
    this.meta = value[h.META];
  }

  get help() {
    return this._help;
  }

  set help(help) {
    if (!help)
      return;

    this._help = help[0];
  }

  get items() {
    return this._items || [];
  }

  set items(items) {
    this._items = items;
  }

  get meta() {
    return this._meta;
  }

  set meta(meta) {
    this[h.INDEX] = meta[h.INDEX];
    this[h.LABEL] = meta[h.LABEL];
    this[h.MAX] = meta[h.MAX];
    this[h.MIN] = meta[h.MIN];
    this[h.SIZE] = meta[h.SIZE];
    this[h.TYPE] = meta[h.TYPE];
    this[h.UNITS] = meta[h.UNITS];
    this[h.VALUE] = meta[h.VALUE];

    this._meta = meta;
  }

  parse() {
    this.items = this.items.map((item) => {
      return new Item(item);
    });
  }

  print() {
    let items = this.items.map(item => {
      return item.print();
    });

    return {
      help: this.help,
      label: this.label,
      index: this.index,
      items: items,
      max: this.max,
      min: this.min,
      size: this.size,
      type: this.type,
      units: this.units,
      value: this.value
    };
  }

}

module.exports = Value;
