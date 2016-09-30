import Farm from '../models/farm.model';

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
    console.log('The raw response from Mongo was ', raw);
  });

  Farm.find({Location_State: req.params.name}, (err, farms) => {
    console.log(`found ${farms.length} farms matching ${req.params.name}`);
  });

  Farm.find({Location_State: slugify(req.params.name)}, (err, farms) => {
    console.log(`found ${farms.length} farms matching ${slugify(req.params.name)}`);
    res.send(farms);
  });
}
