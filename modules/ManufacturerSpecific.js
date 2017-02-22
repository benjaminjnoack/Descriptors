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
    super({}, path);
  }

  parse() {
    return super.parse()
      .then((results) => {
        results = results[h.MSD];
        results = results[h.MANUFACTURER];//An Array

        let all = results.map((manufacturer) => {
          manufacturer = new Manufacturer(manufacturer);
          return manufacturer.parse();
        });

        return Promise.all(all);
      });
  }
}

module.exports = ManufacturerSpecific;
