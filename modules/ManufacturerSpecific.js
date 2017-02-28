/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  File          = require('./File'),
  fs            = require('fs'),
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

        return Promise.all(all)
          .then((manufacturers) => {
            ManufacturerSpecific.writeIndex(manufacturers);
          });
      });
  }

  static writeIndex(manufacturers) {
    let file = `${h.OUTPUT_DIR}/manufacturers/index.json`;
    let data = JSON.stringify(manufacturers, null, 4);
    fs.writeFileSync(file, data);
  }
}

module.exports = ManufacturerSpecific;
