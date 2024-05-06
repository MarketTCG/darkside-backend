import { Schema } from 'mongoose';

export const ListingSchema = new Schema({
    VendorId: String,
    Listed: [{CardId: String, VendorId: String, Price: Number}],
    Total: Number,
    Sold: [{CardId: String, CustomerId: String, Price: Number}],
}, {collection:'listings'});

export default ListingSchema;