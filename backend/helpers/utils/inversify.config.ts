import TYPES from '../types';

import {Container} from 'inversify';
import { AuthService } from '../../service/auth';

const container = new Container();

container.bind<AuthService>(TYPES.AuthService ).to(AuthService).inSingletonScope();
export default container;