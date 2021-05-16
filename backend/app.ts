import 'reflect-metadata';
import express from 'express';
import container from './src/helpers/utils/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import ConnectDatabase from './src/helpers/connectDB';
import * as swaggerDocument from './src/swagger/swagger_doc.json';

const swaggerUi = require('swagger-ui-express');

import './src/controller/auth';
import addCors from './src/helpers/addCors';
const cors = require('cors');
import { dataBaseUrl, dataBaseUrltTest } from './src/helpers/utils/config';

const app = express();
app.use(cors())

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

ConnectDatabase(process.env.NODE_ENV === 'test' ? dataBaseUrltTest : dataBaseUrl);

module.exports = app;