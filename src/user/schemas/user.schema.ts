import { Schema } from 'mongoose';
import { Role } from '@roles/roles.enum'; // Adjust the import path as necessary

export const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String },
  roles: { type: [String], enum: Role, default: [Role.User] }, // Add roles field
  vendorID: { type: String },
}, {
  collection: 'users',
  versionKey: false
});

export default UserSchema;
