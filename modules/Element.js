/**
 * Created by ben on 2/21/17.
 */
'use strict';
//TODO send meta to super, set meta is always called, becomes print
class Element {
  constructor(meta) {
    if (new.target === Element)
      throw `Element may not be instantiated directly`;

    this.meta = meta;
  }
  //return this._meta created from this
  get meta() {
    return this;//TODO
  }
  //TODO set this._meta to an enumeration of properties from the meta arg
  set meta(meta) {
    Object.assign(this, meta);
  }
}

module.exports = Element;
