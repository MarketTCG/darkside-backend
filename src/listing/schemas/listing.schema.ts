import { Schema } from 'mongoose';

export const ListingSchema = new Schema({
    VendorId: String,
    Listed: [{ _id: String, CardId: String, Price: Number }],
    Total: Number,
    Sold: [{CardId: String, CustomerId: String, Price: Number}],
}, {collection:'listings',
    versionKey: false
});

export default ListingSchema;