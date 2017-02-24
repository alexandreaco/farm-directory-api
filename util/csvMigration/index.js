import { slugify } from '../helpers';
import Location from '../../models/location.model';
import processFarm from './processFarm';

const debug = require('debug')('app');
const fs = require('fs');
const parse = require('csv-parse');

export const readCSV = (req, res) => {
  const response = [];
  const inputFile = './backup/farmers-markets.csv';
  let keys = [];
  const parser = parse({ delimiter: ',' }, (err, data) => {
    data.forEach((line, i) => {
      if (i === 0) {
        keys = line;
        debug(line);
      } else {
        let object = {};
        object = {
          name: line[keys.indexOf('MarketName')],
          description: line[keys.indexOf('Location')],
          type: 'market',
          contact: {
            website: line[keys.indexOf('Website')],
            facebook: line[keys.indexOf('Facebook')],
            twitter: line[keys.indexOf('Twitter')],
            youtube: line[keys.indexOf('Youtube')],
            instagram: line[keys.indexOf('OtherMedia')],
          },
          address: {
            street: line[keys.indexOf('street')],
            city: line[keys.indexOf('city')],
            county: line[keys.indexOf('County')],
            state: line[keys.indexOf('State')],
            zip: line[keys.indexOf('zip')],
          },
          loc: {
            lat: line[keys.indexOf('y')],
            lon: line[keys.indexOf('x')],
          },
          payment: {
            hasCredit: line[keys.indexOf('Credit')] === 'Y' || false,
            hasWIC: line[keys.indexOf('WIC')] === 'Y' || false,
            hasWICcash: line[keys.indexOf('WICcash')] === 'Y' || false,
            hasSFMNP: line[keys.indexOf('SFMNP')] === 'Y' || false,
            hasSNAP: line[keys.indexOf('SNAP')] === 'Y' || false,
          },
          stateID: slugify(line[keys.indexOf('State')]),
        };
        const products = [];
        if (line[keys.indexOf('Organic')] === 'Y') products.push('58a74b424b8a02185d3e3769');
        if (line[keys.indexOf('Bakedgoods')] === 'Y') products.push('58a74b424b8a02185d3e3768');
        if (line[keys.indexOf('Cheese')] === 'Y') products.push('58a74b424b8a02185d3e376a');
        if (line[keys.indexOf('Crafts')] === 'Y') products.push('58a77152c5e4b55a978a78f6');
        if (line[keys.indexOf('Flowers')] === 'Y') products.push('58a74b424b8a02185d3e3767');
        if (line[keys.indexOf('Eggs')] === 'Y') products.push('58a74b424b8a02185d3e376d');
        if (line[keys.indexOf('Seafood')] === 'Y') products.push('58a74b424b8a02185d3e376b');
        if (line[keys.indexOf('Herbs')] === 'Y') products.push('58a74b424b8a02185d3e376c');
        if (line[keys.indexOf('Vegetables')] === 'Y') products.push('58a74b424b8a02185d3e376e');
        if (line[keys.indexOf('Honey')] === 'Y') products.push('58a74b424b8a02185d3e376f');
        if (line[keys.indexOf('Jams')] === 'Y') products.push('58a74b424b8a02185d3e3773');
        if (line[keys.indexOf('Maple')] === 'Y') products.push('58a74b424b8a02185d3e3777');
        if (line[keys.indexOf('Meat')] === 'Y') products.push('58a74b424b8a02185d3e3770');
        if (line[keys.indexOf('Nursery')] === 'Y') products.push('58a74b424b8a02185d3e3772');
        if (line[keys.indexOf('Nuts')] === 'Y') products.push('58a74b424b8a02185d3e3771');
        if (line[keys.indexOf('Plants')] === 'Y') products.push('58a74b424b8a02185d3e3774');
        if (line[keys.indexOf('Poultry')] === 'Y') products.push('58a74b424b8a02185d3e3776');
        if (line[keys.indexOf('Prepared')] === 'Y') products.push('58a74b424b8a02185d3e3775');
        if (line[keys.indexOf('Soap')] === 'Y') products.push('58a74b424b8a02185d3e3780');
        if (line[keys.indexOf('Trees')] === 'Y') products.push('58a74b424b8a02185d3e377a');
        if (line[keys.indexOf('Wine')] === 'Y') products.push('58a74b424b8a02185d3e377e');
        if (line[keys.indexOf('Coffee')] === 'Y') products.push('58a74b424b8a02185d3e3778');
        if (line[keys.indexOf('Beans')] === 'Y') products.push('58a74b424b8a02185d3e3779');
        if (line[keys.indexOf('Fruits')] === 'Y') products.push('58a74b424b8a02185d3e377b');
        if (line[keys.indexOf('Grains')] === 'Y') products.push('58a74b424b8a02185d3e377c');
        if (line[keys.indexOf('Juices')] === 'Y') products.push('58a74b424b8a02185d3e377d');
        if (line[keys.indexOf('Mushrooms')] === 'Y') products.push('58a74b424b8a02185d3e377f');
        if (line[keys.indexOf('PetFood')] === 'Y') products.push('58a74b424b8a02185d3e3783');
        if (line[keys.indexOf('Tofu')] === 'Y') products.push('58a74b424b8a02185d3e3782');
        if (line[keys.indexOf('WildHarvested')] === 'Y') products.push('58a74b424b8a02185d3e3781');
        object.products = products;

        const newMarketLocation = new Location(object);
        newMarketLocation.save();

        response.push(object);
      }
    });
    res.send(response);
  });

  fs.createReadStream(inputFile).pipe(parser);
};

export const readFarmsCSV = (req, res) => {
  const inputFile = './backup/on-farm-market.csv';
  let keys = [];
  const parser = parse({ delimiter: ',' }, (err, data) => {
    keys = data[0];
    const farmPromises = data.map((line, i) => {
      if (i > 0) {
        return processFarm(line, keys, i);
      }
      return {};
    });

    Promise.all(farmPromises)
    .then((farms) => {
      debug('complete!!');
      res.send({
        count: farms.length,
        rows: farms,
      });
    });
  });
  fs.createReadStream(inputFile).pipe(parser);
};
