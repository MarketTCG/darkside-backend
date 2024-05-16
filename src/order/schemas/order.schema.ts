import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  OrderDate: String
}, {collection:'orders',
  versionKey: false
})


 export default OrderSchema;
 