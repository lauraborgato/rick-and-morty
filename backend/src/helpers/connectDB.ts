import { dataBaseUrl } from './utils/config';

export default function ConnectDatabase() {
  const mongoose = require('mongoose');
  const url = dataBaseUrl;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection
  db.once('open', () => {
    console.log('Database connected:', url)
  });

  db.on('error', (err: Error) => {
    console.error('connection error:', err)
  });
}