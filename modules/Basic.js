/**
 * Created by ben on 2/22/17.
 */
'use strict';

const
  Element = require('./Element'),
  h = require('./h');

class Basic extends Element {
  constructor(basic) {
    super(basic[h.META]);
  }

  print() {
    return {
      [h.KEY]: this[h.KEY],
      [h.LABEL]: this[h.LABEL]
    };
  }
}

module.exports = Basic;
