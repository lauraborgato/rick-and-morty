let db: any;
export default function ConnectDatabase(dataBaseUrl: string) {
  const mongoose = require('mongoose');
  const url = dataBaseUrl;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose.connection
  db.once('open', () => {
    console.log('Database connected:', url)
  });

  db.on('error', (err: Error) => {
    console.error('connection error:', err)
  });
}