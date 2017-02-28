/**
 * Created by ben on 2/17/17.
 */
'use strict';

const
  CommandClass  = require('./CommandClass'),
  File          = require('./File'),
  fs            = require('fs'),
  h             = require('./h');

class Product extends File {
  constructor(manufacturer_meta, product_meta) {
    super(product_meta, product_meta[h.CONFIG]);

    this.manufacturer = manufacturer_meta;
    this._cc = [];
  }

  get command_classes() {
    return this._cc.map((cc) => { return cc.print() });
  }

  set command_classes(cc) {
    this._cc.push(cc);
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = parseInt(id, 16);
  }

  get manufacturer() {
    return this._manufacturer;
  }

  set manufacturer(meta) {
    this._manufacturer = meta;
  }

  get type() {
    return this._type;
  }

  set type(type) {
    this._type = parseInt(type, 16);
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
          result = result[h.PRODUCT];
          result = result[h.COMMAND_CLASS];

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
      Product.writeCCFile(this.manufacturer, this);
      Product.writeDescriptorFile(this.manufacturer, this);
      this.log();
    });

    return result;
  }

  print() {
    return {
      categoryProductId: Product.categoryProductId(this.manufacturer, this),
      name: this.name,
      id: this.id,
      type: this.type
    };
  }

  static categoryProductId(manufacturer, product) {
    const id = Buffer.allocUnsafe(6);
    id.writeUInt16BE(manufacturer.id);
    id.writeUInt16BE(product.type, 2);
    id.writeUInt16BE(product.id, 4);
    return id.toString('hex');
  }

  static getCCTemp(manufacturer, product) {
    let template = {
      command_classes: product.command_classes,
      manufacturer: manufacturer.name,
      product: product.name,
      manufacturerId: manufacturer.id,
      productId: product.id,
      productTypeId: product.type
    };

    return JSON.stringify(template, null, 4);
  }

  static writeCCFile(manufacturer, product) {
    let file = Product.categoryProductId(manufacturer, product);
    file = `${h.OUTPUT_DIR}/cc/${file}.json`;
    fs.writeFileSync(file, Product.getCCTemp(manufacturer, product));
  }

  static getDescriptorTemp(manufacturer, product) {
    let template = {
      commands: {},
      configurations: [],
      meta: {
        display: {
          category: "",
          manufacturer: manufacturer.name,
          product: product.name,
          type: ""
        }
      },
      manufacturerId: manufacturer.id,
      productId: product.id,
      productTypeId: product.type
    };

    return JSON.stringify(template, null, 4);
  }

  static writeDescriptorFile(manufacturer, product) {
    let file = Product.categoryProductId(manufacturer, product);
    file = `${h.OUTPUT_DIR}/descriptors/${file}.json`;
    fs.writeFileSync(file, Product.getDescriptorTemp(manufacturer, product));
  }
}

module.exports = Product;