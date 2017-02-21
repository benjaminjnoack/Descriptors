/**
 * Created by ben on 2/17/17.
 */
'use strict';

const CommandClass  = require('./CommandClass'),
      File          = require('./File'),
      fs            = require('fs'),
      path          = require('path');

const
  COMMAND_CLASS = 'CommandClass',
  CONFIG  = 'config',
  DESCRIPTORS_DIR = path.join(__dirname, '..', 'descriptors'),
  ID    = 'id',
  NAME  = 'name',
  PRODUCT = 'Product',
  TYPE  = 'type';

const util = require('util');

class Product extends File {
  constructor(manufacturer_meta, product_meta) {
    super(product_meta[CONFIG]);

    this.id = product_meta[ID];
    this.manufacturer = manufacturer_meta;
    this.name = product_meta[NAME];
    this.type = product_meta[TYPE];

    this._cc = [];

    this.log();
  }

  get command_classes() {
    return this._cc.map((cc) => { return cc.print() });
  }

  set command_classes(cc) {
    this._cc.push(cc);
  }

  get id() {
    return parseInt(this._id, 16);
  }

  set id(id) {
    this._id = id;
  }

  get manufacturer() {
    return this._manufacturer;
  }

  set manufacturer(meta) {
    this._manufacturer = meta;
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

  parse() {
    let result = Promise.resolve();

    result = result.then(() => {
      if (!this.path)
        return;

      return super.parse()
        .then((result) => {
          result = result[PRODUCT];
          result = result[COMMAND_CLASS];

          if (result) {
            result.forEach(cc => {
              cc = new CommandClass(cc);
              cc.parse();
              this.command_classes = cc;
            });
          }
        });
    });

    result = result.then(() => {
      Product.writeProductFile(this.manufacturer, this);
    });

    return result;
  }

  static categoryProductId(manufacturer, product) {
    const id = Buffer.allocUnsafe(6);
    id.writeUInt16BE(manufacturer.id);
    id.writeUInt16BE(product.type, 2);
    id.writeUInt16BE(product.id, 4);
    return id.toString('hex');
  }

  static getTemplate(manufacturer, product) {
    let template = {
      commands: {},
      command_classes: product.command_classes,
      configurations: [],
      meta: {
        display: {
          manufacturer: manufacturer.name,
          product: product.name
        }
      },
      manufacturerId: manufacturer.id,
      productId: product.id,
      productTypeId: product.type
    };

    return JSON.stringify(template, null, 4);
  }

  static writeProductFile(manufacturer, product) {
    let file = Product.categoryProductId(manufacturer, product);
    file = `${DESCRIPTORS_DIR}/${file}.json`;
    fs.writeFileSync(file, Product.getTemplate(manufacturer, product));
  }
}

module.exports = Product;