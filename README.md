# Farm Directory API

🐮 Serves up data about farms and farmer's markets in the US

# Getting Started

Make sure you have swagger installed `$ npm install -g swagger`

Make sure you have `$ npm install nodemon -g` and [mongodb](https://www.mongodb.com/collateral/mongodb-3-2-whats-new?jmp=search&utm_source=google&utm_campaign={campaign}&utm_keyword=download%20mongo&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=112603790683&utm_matchtype=e&gclid=CPa3oJKmt88CFURahgod1FkLlA)

Then `$ npm install`

Then import the database dumps
`$ mongoimport --db farm-markets --collection farms --drop --file backup/export.json`
`$ mongoimport --db farm-markets --collection products --drop --file backup/products.json`
`$ mongoimport --db farm-markets --collection facilities --drop --file backup/facilities.json`
`$ mongoimport --db farm-markets --collection activities --drop --file backup/activities.json`
`$ mongoimport --db farm-markets --collection locations --drop --file backup/locations.json`

Then `$ npm start` to boot the server

Access the server from `http://localhost:5000/`

__Check Swagger spec for available routes__
