/**
 * Created by ben on 2/16/17.
 */
'use strict';

const
  fs      = require('fs'),
  util    = require('util'),
  xml2js  = require('xml2js');

let parseString = xml2js.parseString;
let path = `${__dirname}/config/manufacturer_specific.xml`;


let file = fs.readFileSync(path);
parseString(file, (err, result) => {
  readResults(result);
});

function readResults(results) {
  results = results['ManufacturerSpecificData'];
  results = results['Manufacturer'];//An Array

  let meta, name, id;

  results.forEach((manufacturer) => {
    meta = manufacturer['$'];
    id = meta['id'];
    name = meta['name'];
    console.log(`${id} ${name}`);
  });
}