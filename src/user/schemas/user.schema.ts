import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String },
}, {
  collection: 'users',
  versionKey: false
});

export default UserSchema;
