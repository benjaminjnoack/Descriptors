/**
 * Created by ben on 2/16/17.
 */
'use strict';
console.time('runtime');
//TODO move all parse functions into setters, skip that step
const
  FILE = `manufacturer_specific.xml`,
  ManufacturerSpecific = require('./modules/ManufacturerSpecific'),
  util = require('util');

new ManufacturerSpecific(FILE)
  .parse()
  .then((/*results*/) => {
    console.timeEnd('runtime');
  })
  .catch((reason) => {
    console.error(`ERR:`);
    console.dir(util.inspect(reason));
  });