import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  password: String
}, {collection:'users',
  versionKey: false
})


 export default UserSchema;
 