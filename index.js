/**
 * Created by ben on 2/16/17.
 */
'use strict';
console.time('runtime');

const
  ManufacturerSpecific = require('./modules/ManufacturerSpecific');

let file = `manufacturer_specific.xml`;

let m = new ManufacturerSpecific(file);
m.parse()
  .then((results) => {
    console.log(`RESULTS: ${results.length}`);
    console.timeEnd('runtime');
  })
  .catch((reason) => {
    console.error(`ERR: ${reason}`);
  });