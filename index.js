/**
 * Created by ben on 2/16/17.
 */
'use strict';
console.time('runtime');
//TODO move all parse functions into setters, skip that step
const
  FILE = `manufacturer_specific.xml`,
  ManufacturerSpecific = require('./modules/ManufacturerSpecific');

new ManufacturerSpecific(FILE)
  .parse()
  .then((results) => {
    console.log(`RESULTS: ${results.length}`);
    console.timeEnd('runtime');
  })
  .catch((reason) => {
    console.error(`ERR: ${reason}`);
  });