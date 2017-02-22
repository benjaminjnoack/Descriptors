/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  File          = require('./File'),
  h             = require('./h'),
  Manufacturer  = require('./Manufacturer');

class ManufacturerSpecific extends File {
  constructor(path) {
    super(path);
  }

  parse() {
    return super.parse()
      .then((results) => {
        results = results[h.MSD];
        results = results[h.MANUFACTURER];//An Array
        return ManufacturerSpecific.buildManufacturers(results);
      });
  }

  static buildManufacturers(manufacturers) {
    let all = [];

    manufacturers.forEach((manufacturer) => {
      manufacturer = new Manufacturer(manufacturer);
      all.push(manufacturer.parse());
    });

    return Promise.all(all);
  }
}

module.exports = ManufacturerSpecific;
