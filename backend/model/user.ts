import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
