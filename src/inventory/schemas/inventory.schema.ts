import { Schema } from 'mongoose';

export const InventorySchema = new Schema({
  Inventory: [{ CardId: String, Variant: String, Count: Number }],
  Listed: [{ CardId: String, Price: Number }],
}, {collection:'inventory',
  versionKey: false
})


 export default InventorySchema;
 