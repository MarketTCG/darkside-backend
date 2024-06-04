import { Schema } from 'mongoose';

export const VendorSchema = new Schema({
  CustomerID: String,
  InventoryID: String,
  VendorRating: Number
}, {collection:'vendors',
  versionKey: false
})


 export default VendorSchema;
  