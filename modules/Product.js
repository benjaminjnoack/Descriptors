/**
 * Created by ben on 2/17/17.
 */
'use strict';

const CommandClass = require('./CommandClass');

const
  CONFIG  = 'config',
  ID    = 'id',
  NAME  = 'name',
  TYPE  = 'type';
const util = require('util');
class Product {
  constructor(meta) {
    this.config = meta[CONFIG];
    this.id = meta[ID];
    this.name = meta[NAME];
    this.type = meta[TYPE];

    this._cc = [];
  }

  get command_classes() {
    return this._cc.map((cc) => { return cc.id });
  }

  set command_classes(cc) {
    this._cc.push(cc);
  }

  get config() {
    return this._config;
  }

  set config(config) {
    this._config = config;
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

  get type() {
    return parseInt(this._type, 16);
  }

  set type(type) {
    this._type = type;
  }

  log() {
    console.log(`Product: ${this.name} ${this.type} ${this.id}`);
  }

  processCommandClasses(cmdCls) {
    cmdCls.forEach((cmd) => {
      this.command_classes = new CommandClass(cmd);
    });
  }
}

module.exports = Product;