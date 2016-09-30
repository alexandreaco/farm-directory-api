import Farm from '../models/farm.model';

export const getAllFarms = (req, res) => {
  Farm.find({}, function (err, farms) {
    res.send(farms);
  })
};

export const getFarmsByZip = (req, res) => {
  Farm.find({Location_Zip: req.params.zipcode}, (err, farms) => {
    res.send(farms);
    console.log(`found ${farms.length} farms`);
  });
};

export const getFarmsByState = (req, res) => {
  Farm.find({Location_State: req.params.state}, (err, farms) => {
    res.send(farms);
    console.log(`found ${farms.length} farms`);
  });
};
