import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  favouriteCharacters: Array<number>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  password: { type: String, required: true },
  favouriteCharacters: { type: Array, required: false }
});

export const UserModel = mongoose.model<User>('User', UserSchema);
