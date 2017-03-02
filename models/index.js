// Register all mongoose models
import Activity from './activity.model';
import Facility from './facility.model';
import Location from './location.model';
import Product from './product.model';

const registerModels = () => ([
  Activity,
  Facility,
  Location,
  Product,
]);
export default registerModels;
