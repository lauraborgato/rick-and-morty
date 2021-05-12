export default function ConnectDatabase() {
  const mongoose = require('mongoose');
  const url = 'mongodb://127.0.0.1:27017/rick-and-morty';
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection
  db.once('open', () => {
    console.log('Database connected:', url)
  });

  db.on('error', (err: Error) => {
    console.error('connection error:', err)
  });
}