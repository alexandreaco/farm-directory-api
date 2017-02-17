import Farm from '../models/farm.model';
import Facility from '../models/facility.model';
import Product from '../models/product.model';
import Location from '../models/location.model';
const fs = require('fs');
var parse = require('csv-parse');

var debug = require('debug')('app');

export const slugify = (string) => {
  return string.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}


export const cleanUpStateNames = (req, res) => {

  const query = { Location_State: req.params.name };
  const update = { Location_State: slugify(req.params.name) };

  Farm.update(query, update, { multi: true }, (err, raw) => {
    debug('The raw response from Mongo was ', raw);
  });

  Farm.find({Location_State: req.params.name}, (err, farms) => {
    debug(`found ${farms.length} farms matching ${req.params.name}`);
  });

  Farm.find({Location_State: slugify(req.params.name)}, (err, farms) => {
    debug(`found ${farms.length} farms matching ${slugify(req.params.name)}`);
    res.send(farms);
  });
}

export const buildoutFarmObject = (req, res) => {
  // build query object
  const query = {};
  if (req.query.zip) {
    query.Location_Zip = slugify(req.query.zip);
  }
  if (req.query.state) {
    query.Location_State = slugify(req.query.state);
  }

  // get farms
  Farm.find({}, (err, farms) => {
    if (err) {
      res.send(err);
    }
    debug(`found ${farms.length} farms`);
    const response = [];
    farms.forEach(farm => {
      const query2 = { _id: farm._id };
      // build seasons array
      const seasons = [];
      if (farm.season1_date.length > 0) {
        seasons.push({
          date: farm.season1_date,
          time: farm.season1_time,
          notes: farm.season1_notes,
          products: farm.season1_products,
        });
      }
      if (farm.season2_date.length > 0) {
        seasons.push({
          date: farm.season2_date,
          time: farm.season2_time,
          notes: farm.season2_notes,
          products: farm.season2_products,
        });
      }
      if (farm.season3_date.length > 0) {
        seasons.push({
          date: farm.season3_date,
          time: farm.season3_time,
          notes: farm.season3_notes,
          products: farm.season3_products,
        });
      }
      if (farm.season4_date.length > 0) {
        seasons.push({
          date: farm.season4_date,
          time: farm.season4_time,
          notes: farm.season4_notes,
          products: farm.season4_products,
        });
      }
      const update = {
        name: farm.marketname,
        address: {
          street: farm.Location_ST,
          city: farm.Location_City,
          state: farm.Location_State,
          zip: farm.Location_Zip,
          lat: farm.y,
          lon: farm.x,
        },
        info: {
          website: farm.Market_Website,
          facebook: farm.Market_Facebook,
          twitter: farm.Market_Twitter,
          instagram: '',
        },
        seasons: seasons,
      };
      debug('the new data will be ', update);
      Farm.update(query2, update, { multi: true }, (err, raw) => {
        debug('The raw response from Mongo was ', raw);
      });
    })
    Farm.find({}, (err, farms) => {
      debug(`found ${farms.length} farms matching ${req.params.name}`);
      res.send({
        total: farms.length,
        rows: farms,
      });
    });
  });
}

const getProducts = () => {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, product) => {
      resolve(product);
    });
  });
}

export const getLocations = (req, res) => {
  Location.find({})
  .populate('products')
  .exec(function (err, data) {
    if (err) reject(err);
    res.send({
      count: data.length,
      rows: data,
    });
  });
}

export const readCSV = (req, res) => {
  const response = [];
  const inputFile='./backup/farms.csv';
  let keys = [];
  var parser = parse({ delimiter: ',' }, function (err, data) {
    data.forEach((line, i) => {
      if (i === 0 ) {
        keys = line;
        debug(line);
      } else {
        let object = {}
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
            hasCredit: line[keys.indexOf('Credit')] === "Y" || false,
            hasWIC: line[keys.indexOf('WIC')] === "Y" || false,
            hasWICcash: line[keys.indexOf('WICcash')] === "Y" || false,
            hasSFMNP: line[keys.indexOf('SFMNP')] === "Y" || false,
            hasSNAP: line[keys.indexOf('SNAP')] === "Y" || false,
          },
        }
        const products = [];
        if (line[keys.indexOf('Organic')] === 'Y') products.push("58a74b424b8a02185d3e3769");
        if (line[keys.indexOf('Bakedgoods')] === 'Y') products.push("58a74b424b8a02185d3e3768");
        if (line[keys.indexOf('Cheese')] === 'Y') products.push("58a74b424b8a02185d3e376a");
        if (line[keys.indexOf('Crafts')] === 'Y') products.push("58a77152c5e4b55a978a78f6");
        if (line[keys.indexOf('Flowers')] === 'Y') products.push("58a74b424b8a02185d3e3767");
        if (line[keys.indexOf('Eggs')] === 'Y') products.push("58a74b424b8a02185d3e376d");
        if (line[keys.indexOf('Seafood')] === 'Y') products.push("58a74b424b8a02185d3e376b");
        if (line[keys.indexOf('Herbs')] === 'Y') products.push("58a74b424b8a02185d3e376c");
        if (line[keys.indexOf('Vegetables')] === 'Y') products.push("58a74b424b8a02185d3e376e");
        if (line[keys.indexOf('Honey')] === 'Y') products.push("58a74b424b8a02185d3e376f");
        if (line[keys.indexOf('Jams')] === 'Y') products.push("58a74b424b8a02185d3e3773");
        if (line[keys.indexOf('Maple')] === 'Y') products.push("58a74b424b8a02185d3e3777");
        if (line[keys.indexOf('Meat')] === 'Y') products.push("58a74b424b8a02185d3e3770");
        if (line[keys.indexOf('Nursery')] === 'Y') products.push("58a74b424b8a02185d3e3772");
        if (line[keys.indexOf('Nuts')] === 'Y') products.push("58a74b424b8a02185d3e3771");
        if (line[keys.indexOf('Plants')] === 'Y') products.push("58a74b424b8a02185d3e3774");
        if (line[keys.indexOf('Poultry')] === 'Y') products.push("58a74b424b8a02185d3e3776");
        if (line[keys.indexOf('Prepared')] === 'Y') products.push("58a74b424b8a02185d3e3775");
        if (line[keys.indexOf('Soap')] === 'Y') products.push("58a74b424b8a02185d3e3780");
        if (line[keys.indexOf('Trees')] === 'Y') products.push("58a74b424b8a02185d3e377a");
        if (line[keys.indexOf('Wine')] === 'Y') products.push("58a74b424b8a02185d3e377e");
        if (line[keys.indexOf('Coffee')] === 'Y') products.push("58a74b424b8a02185d3e3778");
        if (line[keys.indexOf('Beans')] === 'Y') products.push("58a74b424b8a02185d3e3779");
        if (line[keys.indexOf('Fruits')] === 'Y') products.push("58a74b424b8a02185d3e377b");
        if (line[keys.indexOf('Grains')] === 'Y') products.push("58a74b424b8a02185d3e377c");
        if (line[keys.indexOf('Juices')] === 'Y') products.push("58a74b424b8a02185d3e377d");
        if (line[keys.indexOf('Mushrooms')] === 'Y') products.push("58a74b424b8a02185d3e377f");
        if (line[keys.indexOf('PetFood')] === 'Y') products.push("58a74b424b8a02185d3e3783");
        if (line[keys.indexOf('Tofu')] === 'Y') products.push("58a74b424b8a02185d3e3782");
        if (line[keys.indexOf('WildHarvested')] === 'Y') products.push("58a74b424b8a02185d3e3781");
        object.products = products;

        const newMarketLocation = new Location(object);
        newMarketLocation.save();

        response.push(object);
      }
    })
    res.send(response)
  });

  fs.createReadStream(inputFile).pipe(parser)
}

export const compileFacilities = (req, res) => {
  Farm.find({}, (err, farms) => {
    if (err) {
      res.send(err);
    }
    debug(`found ${farms.length} farms`);
    const facilities = [];
    farms.forEach(farm => {
      if (farm.ActivityList.length > 0) {
        const innerFacilities = farm.ActivityList.split("   ");
        // add each facility if it's not already in the list
        innerFacilities.forEach(fac => {
          const shortString = fac.trim();
          // don't include other
          if (shortString.indexOf('Other') < 0) {
            if (facilities.indexOf(shortString) < 0) facilities.push(shortString);
          }
          // facilities.push(fac);
        });
      }
    });
    res.send(facilities);
  });
}
