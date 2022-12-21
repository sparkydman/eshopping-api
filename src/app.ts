import express, { Request, response, Response } from 'express';
import config from 'config';
import connectDB from './utils/connect';
import log from './utils/logger';
import { restResponseTimeHistogram, startMetricsServer } from './utils/metrics';
import responseTime from 'response-time';
import swaggerDoc from './utils/swagger';
import createServer from './utils/server';

const port = config.get<number>('port');

const app = createServer();

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.listen(port, async () => {
  log.info(`App listening on http://localhost:${port}`);
  await connectDB();

  startMetricsServer();

  swaggerDoc(app, port);
});
