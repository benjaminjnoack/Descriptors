/**
 * Created by ben on 2/22/17.
 */
'use strict';
console.time('runtime');
const
  DeviceClasses = require('./modules/DeviceClasses'),
  util = require('util');

new DeviceClasses('device_classes.xml')
  .parse()
  .then((results) => {
    console.log(util.inspect(results, false, null));
    console.timeEnd('runtime');
  })
  .catch((reason) => {
    console.error(`ERR: ${reason}`);
  });