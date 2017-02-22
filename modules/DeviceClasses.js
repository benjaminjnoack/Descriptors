/**
 * Created by ben on 2/22/17.
 */
'use strict';
//TODO make all optional in xsd conditional in print
const
  Basic     = require('./Basic'),
  DeviceType= require('./DeviceType'),
  File      = require('./File'),
  fs        = require('fs'),
  Generic   = require('./Generic'),
  h         = require('./h'),
  NodeType  = require('./NodeType'),
  Role      = require('./Role');

class DeviceClasses extends File {
  constructor(path) {
    super({}, path);
  }
//todo getters and setters for each with getter being the map print
  parse() {
    return super.parse()
      .then((results) => {
        results = results[h.DEVICE_CLASSES];

        this.basic = results[h.BASIC_CLASS].map((basic) => {
          return new Basic(basic);
        });

        this.device_types = results[h.DEVICE_TYPE].map((device_type) => {
          return new DeviceType(device_type);
        });

        this.generic = results[h.GENERIC_CLASS].map((generic) => {
          return new Generic(generic);
        });

        this.nodes = results[h.NODE_TYPE].map((node_type) => {
          return new NodeType(node_type);
        });

        this.roles = results[h.ROLE].map((role) => {
          return new Role(role);
        });
      })

      .then(() => {
        DeviceClasses.writeMetaFile('basic_classes', this.basic);
        DeviceClasses.writeMetaFile('device_types', this.device_types);
        DeviceClasses.writeMetaFile('generic_classes', this.generic);
        DeviceClasses.writeMetaFile('node_types', this.nodes);
        DeviceClasses.writeMetaFile('roles', this.roles);
      })

      .then(() => {
        return {
          basic_classes: this.basic.length,
          device_types: this.device_types.length,
          generic_classes: this.generic.length,
          node_types: this.nodes.length,
          roles: this.roles.length
        };
      });
  }

  static writeMetaFile(path, collection) {
    collection = collection.map(e => { return e.print(); });
    collection = JSON.stringify(collection, null, 4);
    path = `${h.META_DIR}/${path}.json`;
    fs.writeFileSync(path, collection);
  }
}

module.exports = DeviceClasses;
