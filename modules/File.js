/**
 * Created by ben on 2/21/17.
 */
'use strict';

const
  fs      = require('fs'),
  h       = require('./h'),
  xml2js  = require('xml2js');

class File {
  constructor(path) {
    if (new.target === File)
      throw `File may not be instantiated directly`;

    this.path = path;
  }

  get path() {
    return this._path;
  }

  set path(file) {
    if (!file)
      return;

    this._path = `${h.CONFIG_DIR}/${file}`;
  }

  parse() {
    return File.parseFile(this.path)
      .catch((reason) => {
        console.error(`Error parsing ${this.path}: ${reason}`);
      });
  }

  static parseFile(path) {
    let parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err);

        parser.parseString(data, (err, result) => {
          return err ? reject(err) : resolve(result);
        });
      });
    });
  }
}

module.exports = File;
