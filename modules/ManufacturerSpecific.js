/**
 * Created by ben on 2/21/17.
 */
'use strict';

const File          = require('./File'),
      Manufacturer  = require('./Manufacturer');

const MANUFACTURER_SPECIFIC_DATA  = 'ManufacturerSpecificData',
      MANUFACTURER                = 'Manufacturer';

class ManufacturerSpecific extends File {
  constructor(path) {
    super(path);
  }

  parse() {
    return super.parse()
      .then((results) => {
        results = results[MANUFACTURER_SPECIFIC_DATA];
        results = results[MANUFACTURER];//An Array
        //TODO make a promise out of this
        results.forEach(ManufacturerSpecific.buildManufacturer);
      });
  }

  static buildManufacturer(manufacturer) {
    return new Manufacturer(manufacturer);
  }
}

module.exports = ManufacturerSpecific;
