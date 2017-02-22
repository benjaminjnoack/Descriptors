/**
 * Created by ben on 2/21/17.
 */
'use strict';

const path = require('path');

let h = {};

h = Object.defineProperties(h, {
  'COMMAND_CLASS':  { value: 'CommandClass'},
  'CONFIG'      : { value: 'config'},
  'HELP'        : { value: 'Help'},
  'ID'          : { value: 'id'},
  'INDEX'       : { value: 'index'},
  'ITEM'        : { value: 'Item'},
  'LABEL'       : { value: 'label'},
  'MAX'         : { value: 'max'},
  'META'        : { value: '$'},
  'MIN'         : { value: 'min'},
  'MANUFACTURER': { value: 'Manufacturer'},
  'MSD'         : { value: 'ManufacturerSpecificData'},
  'NAME'        : { value: 'name'},
  'PRODUCT'     : { value: 'Product'},
  'SIZE'        : { value: 'size'},
  'TYPE'        : { value: 'type'},
  'UNITS'       : { value: 'units'},
  'VALUE'       : { value: 'Value'}
});

h = Object.defineProperties(h, {
  'CONFIG_DIR'      : { value: path.join(__dirname, '..', 'config')},
  'DESCRIPTORS_DIR' : { value: path.join(__dirname, '..', 'descriptors')}
});

module.exports = h;