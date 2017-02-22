/**
 * Created by ben on 2/22/17.
 */
'use strict';

const
  Element = require('./Element'),
  h = require('./h');

class NodeType extends Element {
  constructor(node_type) {
    super(node_type[h.META]);
  }

  get command_classes() {
    return this._cc;
  }

  set command_classes(cc) {
    this._cc = cc.split(',');
  }

  print() {
    let print = {
      [h.KEY]: this[h.KEY],
      [h.LABEL]: this[h.LABEL]
    };

    if (this[h.BASIC])
      print[h.BASIC] = this[h.BASIC];

    if (this[h.COMMAND_CLASSES])
      print[h.COMMAND_CLASSES] = this[h.COMMAND_CLASSES];

    return print;
  }
}

module.exports = NodeType;
