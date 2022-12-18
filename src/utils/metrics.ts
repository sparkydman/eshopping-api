import express, { Request, Response } from 'express';
import client from 'prom-client';
import log from './logger';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_histogram',
  help: 'REST API response time histogram',
  labelNames: ['method', 'route', 'status_code'],
});
export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'database_response_time_histogram',
  help: 'Database response time histogram',
  labelNames: ['operation', 'success'],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    log.info('Starting metrics server on http://localhost:9100');
  });
}
