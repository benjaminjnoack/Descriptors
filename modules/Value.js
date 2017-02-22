/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  Element = require('./Element'),
  h       = require('./h'),
  Item    = require('./Item');

class Value extends Element {
  constructor(value) {
    super(value[h.META]);

    this.help = value[h.HELP];
    this.items = value[h.ITEM];
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
    return {
      help: this.help,
      label: this.label,
      index: this.index,
      max: this.max,
      min: this.min,
      size: this.size,
      type: this.type,
      units: this.units,
      value: this.value
    };
  }

  set meta(meta) {
    super.meta = meta;
  }

  parse() {
    this.items = this.items.map((item) => {
      return new Item(item);
    });
  }

  print() {
    let print = this.meta;

    print['items'] = this.items.map(item => {
      return item.print();
    });

    return print;
  }

}

module.exports = Value;
