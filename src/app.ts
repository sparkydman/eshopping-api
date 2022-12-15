import express from 'express';
import config from 'config';
import connectDB from './utils/connect';
import log from './utils/logger';
import routes from './routes';
import { deserializeUser } from './middleware/deserializeUser';

const port = config.get<number>('port');

const app = express();

app.use(express.json());

app.listen(port, async () => {
  log.info(`App listening on http://localhost:${port}`);
  await connectDB();

  app.use(deserializeUser);

  routes(app);
});
