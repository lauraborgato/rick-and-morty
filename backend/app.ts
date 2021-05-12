import 'reflect-metadata';
import express, { Application } from 'express';
import container from './helpers/inversify.config';
import { InversifyExpressServer, interfaces, TYPE } from 'inversify-express-utils';
import ConnectDatabase from './helpers/connectDB';

import './controller/auth';

const app = express();

let server =  new InversifyExpressServer(container, null, { rootPath: '/api' }, app);

let appConfigured = server.build();
let serve: any = appConfigured.listen(process.env.PORT || 3000, () => `App running on ${serve.address().port}`);

ConnectDatabase();
