/**
 * Created by ben on 2/17/17.
 */
'use strict';

const Product = require('./Product');

const
  ID    = 'id',
  META  = '$',
  NAME  = 'name',
  PRODUCT  = 'Product';

class Manufacturer {
  constructor(manufacturer) {
    this.meta = manufacturer[META];

    if (manufacturer[PRODUCT])
      this.products = manufacturer[PRODUCT];

    this.log();
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

  get meta() {
    return this._meta;
  }

  set meta(meta) {
    this.id = meta[ID];
    this.name = meta[NAME];

    this._meta = {
      id: this.id,
      name: this.name
    };
  }

  get products() {
    return this._products || [];
  }

  set products(products) {
    this._products = products.map((product) => {
      return new Product(this.meta, product[META]);
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

    return Promise.all(all);
  }
}

module.exports = Manufacturer;