import addListOfProducts from './addListOfProducts';

// line = .csv line as an array
// keys = array of keys to map to line
// season = string
const processSeason = (line, keys, season) => (
  new Promise((resolve) => {
    if (line[keys.indexOf(`${season}_date`)].length > 0) {
      const productNames = line[keys.indexOf(`${season}_products`)].split('   ');
      addListOfProducts(productNames)
      .then((productObjects) => {
        // debug(`resolved season ${season} ${i}`);
        resolve({
          days: line[keys.indexOf(`${season}_date`)],
          time: line[keys.indexOf(`${season}_time`)],
          notes: line[keys.indexOf(`${season}_notes`)],
          products: productObjects,
        });
      });
    } else {
      resolve({});
    }
  })
);

export default processSeason;
