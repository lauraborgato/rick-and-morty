import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
  name:  String, 
  email: String,
  password:   String,
  favoritesList: [{ characterString: String }],
});

export default User;