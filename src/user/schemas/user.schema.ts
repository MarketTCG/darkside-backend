import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  Username: String,
  Password: String
}, {collection:'users',
  versionKey: false
})


 export default UserSchema;
 