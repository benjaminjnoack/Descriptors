/**
 * Created by ben on 2/16/17.
 *
 * { '$': { id: '0214', name: 'Kaipule' },
          Product:
           [ { '$':
                { type: '0002',
                  id: '0001',
                  name: 'IM20 Door/Window Sensor',
                  config: 'kaipule/im20.xml' } } ] },

 */
'use strict';

const
  fs      = require('fs'),
  util    = require('util'),
  xml2js  = require('xml2js');

const
  META                        = '$',
  ID                          = 'id',
  MANUFACTURER_SPECIFIC_DATA  = 'ManufacturerSpecificData',
  MANUFACTURER                = 'Manufacturer',
  NAME                        = 'name',
  PRODUCT                     = 'Product',
  TYPE                        = 'type';

let parseString = xml2js.parseString;
let path = `${__dirname}/config/manufacturer_specific.xml`;


let file = fs.readFileSync(path);
parseString(file, (err, result) => {
  readResults(result);
});

function readResults(results) {
  results = results[MANUFACTURER_SPECIFIC_DATA];
  results = results[MANUFACTURER];//An Array

  let meta, name, manufacturerId, products, productId, productType, productName;

  results.forEach((manufacturer) => {
    meta = manufacturer[META];
    manufacturerId = meta[ID];
    name = meta[NAME];
    products = manufacturer[PRODUCT];

    console.log(`Manufacturer: ${manufacturerId} ${name}`);

    if (products) {
      products.forEach(product => {
        product = product[META];
        productId = product[ID];
        productType = product[TYPE];
        productName = product[NAME];

        console.log(`\tProduct: ${productName} ${productType} ${productId}`);
      });
    }
  });
}