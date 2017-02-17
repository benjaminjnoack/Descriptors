/**
 * Created by ben on 2/17/17.
 */
'use strict';

const
  ID    = 'id',
  NAME  = 'name';

class Manufacturer {
  constructor(meta) {
    this.id = meta[ID];
    this.name = meta[NAME];
  }

  get id() {
    return parseInt(this._id, 16);
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  log() {
    console.log(`Manufacturer: ${this.id} ${this.name}`);
  }
}

module.exports = Manufacturer;