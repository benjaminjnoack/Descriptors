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

  let meta, file, path,
    manufacturerName, manufacturerId,
    products, productId, productType, productName;

  results.forEach((manufacturer) => {
    meta = manufacturer[META];
    manufacturerId = parseInt(meta[ID], 16);
    manufacturerName = meta[NAME];
    products = manufacturer[PRODUCT];

    console.log(`Manufacturer: ${manufacturerId} ${manufacturerName}`);

    if (products) {
      products.forEach(product => {
        product = product[META];
        productId = parseInt(product[ID], 16);
        productType = parseInt(product[TYPE], 16);
        productName = product[NAME];

        console.log(`\tProduct: ${productName} ${productType} ${productId}`);

        path = categoryProductId(manufacturerId, productType, productId);
        path = `${__dirname}/descriptors/${path}.json`;
        file = generateTemplate(manufacturerName, productName);
        fs.writeFileSync(path, file);
      });
    }
  });
}

function categoryProductId(manufacturerId, productTypeId, productId) {
  const id = Buffer.allocUnsafe(6);
  id.writeUInt16BE(manufacturerId);
  id.writeUInt16BE(productTypeId, 2);
  id.writeUInt16BE(productId, 4);
  return id.toString('hex');
}

function generateTemplate(manufacturer, product) {
  let template = {
    commands: {},
    configurations: [],
    manufacturer: manufacturer,
    meta: {},
    product: product,
  };

  return JSON.stringify(template, null, 4);
}