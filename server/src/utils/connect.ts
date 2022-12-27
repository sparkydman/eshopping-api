import config from 'config';
import mongoose from 'mongoose';
import log from './logger';

export default function connectDB() {
  const uri = config.get<string>('dbURI');
  mongoose.set('strictQuery', false);

  return mongoose
    .connect(uri)
    .then(() => log.info('connected to database'))
    .catch(() => {
      log.error('connection to the db failed');
      process.exit(1);
    });
}
