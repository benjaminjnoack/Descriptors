/**
 * Created by ben on 2/21/17.
 */
'use strict';

const Item = require('./Item');

const
  HELP  = 'Help',
  INDEX = 'index',
  ITEM  = 'Item',
  LABEL = 'label',
  MAX   = 'max',
  META  = '$',
  MIN   = 'min',
  SIZE  = 'size',
  TYPE  = 'type',
  UNITS = 'units',
  VALUE = 'value';

class Value {
  constructor(value) {
    this.help = value[HELP];
    this.items = value[ITEM];
    this.meta = value[META];
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
    this[INDEX] = meta[INDEX];
    this[LABEL] = meta[LABEL];
    this[MAX] = meta[MAX];
    this[MIN] = meta[MIN];
    this[SIZE] = meta[SIZE];
    this[TYPE] = meta[TYPE];
    this[UNITS] = meta[UNITS];
    this[VALUE] = meta[VALUE];

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
