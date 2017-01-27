# Farm Directory API

🐮 Serves up data about farms in the US with on-site markets

# Getting Started

Make sure you have swagger installed `$ npm install -g swagger`

Make sure you have `$ npm install nodemon -g` and [mongodb](https://www.mongodb.com/collateral/mongodb-3-2-whats-new?jmp=search&utm_source=google&utm_campaign={campaign}&utm_keyword=download%20mongo&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=112603790683&utm_matchtype=e&gclid=CPa3oJKmt88CFURahgod1FkLlA)

Then `$ npm install`

Then import the database dump `$ mongoimport --db farm-markets --collection farms --drop --file backup/export.json`

Then `$ npm start` to boot the server

Access the server from `http://localhost:3000/`

# Available Routes

- `/api` will return an array of all farms in the database.

- `/api/zip/:zipcode` will return an array of all farms in that zipcode.

- `/api/state/:state` will return an array of all farms in that state. *Note: The state is stored as a slug*
