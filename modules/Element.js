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

  get meta() {
    return this._meta;
  }

  set meta(meta) {
    Object.assign(this, meta);
  }
}

module.exports = Element;
