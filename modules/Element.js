/**
 * Created by ben on 2/21/17.
 */
'use strict';

class Element {
  constructor(meta) {
    if (new.target === Element)
      throw `Element may not be instantiated directly`;

    this.meta = meta;
  }

  get meta() {
    return this;//TODO
  }

  set meta(meta) {
    Object.assign(this, meta);
  }
}

module.exports = Element;
