import TYPES from '../types';

import {Container} from 'inversify';
import { UserService } from '../../service/user';
import { CharacterService } from '../../service/characters';
import { interfaces, TYPE } from 'inversify-express-utils';
import { AuthController } from '../../controller/auth';
import { CharacterController } from '../../controller/character';

const container = new Container();

container.bind<UserService>(TYPES.AuthService ).to(UserService).inSingletonScope();
container.bind<CharacterService>(TYPES.CharacterService ).to(CharacterService).inSingletonScope();
container.bind<interfaces.Controller>(TYPES.AuthController).to(AuthController).whenTargetNamed('AuthController');
container.bind<interfaces.Controller>(TYPES.CharacterController).to(CharacterController).whenTargetNamed('CharacterController');

export default container;