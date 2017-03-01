/**
 * Created by ben on 2/21/17.
 */
'use strict';

const path = require('path');

let h = {};

h = Object.defineProperties(h, {
  'BASE_DIR'        : { value: path.join(__dirname, '..')},
  'BASIC'           : { value: 'basic'},
  'BASIC_CLASS'     : { value: 'Basic'},
  'COMMAND_CLASS'   : { value: 'CommandClass'},
  'COMMAND_CLASSES' : { value: 'command_classes'},
  'CONFIG'          : { value: 'config'},
  'DEVICE_CLASSES'  : { value: 'DeviceClasses'},
  'DEVICE_TYPE'     : { value: 'DeviceType'},
  'GENERIC_CLASS'   : { value: 'Generic'},
  'HELP'            : { value: 'Help'},
  'ID'              : { value: 'id'},
  'INDEX'           : { value: 'index'},
  'ITEM'            : { value: 'Item'},
  'KEY'             : { value: 'key'},
  'LABEL'           : { value: 'label'},
  'MAX'             : { value: 'max'},
  'META'            : { value: '$'},
  'MIN'             : { value: 'min'},
  'MANUFACTURER'    : { value: 'Manufacturer'},
  'MSD'             : { value: 'ManufacturerSpecificData'},
  'NAME'            : { value: 'name'},
  'NODE_TYPE'       : { value: 'NodeType'},
  'PRODUCT'         : { value: 'Product'},
  'ROLE'            : { value: 'Role'},
  'SIZE'            : { value: 'size'},
  'SPECIFIC_CLASS'  : { value: 'Specific'},
  'TYPE'            : { value: 'type'},
  'UNITS'           : { value: 'units'},
  'VALUE'           : { value: 'Value'}
});

h = Object.defineProperties(h, {
  'CONFIG_DIR'      : { value: path.join(h.BASE_DIR, 'config')},
  'OUTPUT_DIR'      : { value: path.join(h.BASE_DIR, 'output')}
});

module.exports = h;