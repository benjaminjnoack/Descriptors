/**
 * Created by ben on 2/17/17.
 */
'use strict';

const
  Element = require('./Element'),
  fs      = require('fs'),
  h       = require('./h'),
  Product = require('./Product');

class Manufacturer extends Element {
  constructor(manufacturer) {
    super(manufacturer[h.META]);

    if (manufacturer[h.PRODUCT])
      this.products = manufacturer[h.PRODUCT];

    this.log();
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = parseInt(id, 16);
  }

  get meta() {
    return {
      id: this.id,
      name: this.name
    };
  }

  set meta(meta) {
    super.meta = meta;
  }

  get products() {
    return this._products || [];
  }

  set products(products) {
    this._products = products.map((product) => {
      return new Product(this.meta, product[h.META]);
    });
  }

  log() {
    console.log(`Manufacturer: ${this.id} ${this.name}`);
  }

  parse() {
    if (!this.products.length)
      return Promise.resolve();

    let all = [];

    this.products.forEach((product) => {
      all.push(product.parse());
    });

    return Promise.all(all)
      .then(() => {
        Manufacturer.writeManufacturerFile(this);
      });
  }

  print() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      products: this.products.map(p => { return p.print(); })
    }, null, 4);
  }

  static writeManufacturerFile(manufacturer) {
    let file = `${h.OUTPUT_DIR}/manufacturers/${manufacturer.id}.json`;
    fs.writeFileSync(file, manufacturer.print());
  }
}

module.exports = Manufacturer;