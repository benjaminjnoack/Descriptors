/**
 * Created by ben on 2/17/17.
 */
'use strict';

const
  ID    = 'id',
  META  = '$';

class CommandClass {
  constructor(cc) {
    this.id = cc[META];
  }

  get id() {
    return parseInt(this._id);//TODO Hex radix?
  }

  set id(meta) {
    this._id = meta[ID];
  }
}

module.exports = CommandClass;
