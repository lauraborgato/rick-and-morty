import 'reflect-metadata';
import express from 'express';
import container from './helpers/utils/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import ConnectDatabase from './helpers/connectDB';
import * as swaggerDocument from './swagger/swagger_doc.json';

const swaggerUi = require('swagger-ui-express');

import './controller/auth';
import addCors from './helpers/addCors';

const app = express();
app.use(addCors())

let server =  new InversifyExpressServer(container, null, { rootPath: '/api' }, app);

server.setConfig((app) => {
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});


let appConfigured = server.build();
let serve: any = appConfigured.listen(process.env.PORT || 8080, () => `App running on ${serve.address().port}`);

ConnectDatabase();
