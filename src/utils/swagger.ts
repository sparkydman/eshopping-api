import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import log from './logger';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Shopping REST API Documentation',
      version,
      description:
        'The documentation is the comprehensive documentation for the implementation of the E-Shopping REST API using swagger documentation',
    },
    componets: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDoc(app: Express, port: number) {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDoc;
