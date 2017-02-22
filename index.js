/**
 * Created by ben on 2/16/17.
 */
'use strict';
console.time('runtime');

const
  FILE = `manufacturer_specific.xml`,
  ManufacturerSpecific = require('./modules/ManufacturerSpecific');

let m = new ManufacturerSpecific(FILE);

m.parse()
  .then((results) => {
    console.log(`RESULTS: ${results.length}`);
    console.timeEnd('runtime');
  })
  .catch((reason) => {
    console.error(`ERR: ${reason}`);
  });