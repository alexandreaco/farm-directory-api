module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    'rules': {
      'no-underscore-dangle': 0, // throws an error with mongo's _id prop
      'no-unused-expressions': 0, // was throwing errors for expect()
    },
    'env': {
      'node': true,
      'mocha': true,
    },
};
