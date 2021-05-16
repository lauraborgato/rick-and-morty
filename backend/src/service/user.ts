import { injectable } from 'inversify';
import { User, UserModel } from '../model/DataModel/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Session from '../model/ApiModels/session';
import { secretString } from '../helpers/utils/config';

@injectable()
export class UserService {
  validateUser = async (user: User): Promise<Session> => {
    let fetchuser: any;
    return UserModel.findOne({ email: user.email })
      .then((dbUser: any) => {
        if (!dbUser) {
          throw new Error('User name or password are incorrect');
        }
        fetchuser = dbUser;
        return bcrypt.compare(user.password, dbUser.password);
      })
      .then((result: boolean) => {
        if (!result) {
          throw new Error('User name or password are incorrect');
        }
        const token = jwt.sign({ email: fetchuser.email, userId: fetchuser._id }, secretString, { expiresIn: '1h' });
        return new Session(token, 3600, fetchuser._id);
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  create = async (user: User): Promise<Session> => {
    return UserModel.findOne({ email: user.email })
      .then((dbUser: any) => {
        if (dbUser) {
          throw new Error('User name or password already exits');
        } 
        return bcrypt.hash(user.password, 10)
        .then((hash: string) => {
          return UserModel.create({ name: user.name, email: user.email, password: hash })
            .then(result => {
              const token = jwt.sign({ email: user.email, userId: result._id }, secretString, { expiresIn: '1h' });
              return new Session(token, 360, result._id);
            })
            .catch(err => {
              throw err;
            });
        });
      });
  }

  addFavouriteToUser = async (userId: string, characterId: number): Promise<number> => {
    return UserModel.findById(userId)
      .then((user: User | null) => {
        if(user){
          if(!user.favouriteCharacters.includes(characterId)) {
            user.favouriteCharacters.push(characterId);
            user.save();
            return characterId;
          }
          throw new Error('Character already added');
        }
        throw new Error('Invalid user');
    }).catch((err: Error) => { throw err });
  }

  removeFavouriteFromUser = async (userId: string, characterId: number): Promise<number> => {
    return UserModel.findById(userId)
      .then((user: User | null) => {
        if(user){
          if(user.favouriteCharacters.includes(characterId)){
            user.favouriteCharacters = user.favouriteCharacters.filter((currentCharacterId: number) => currentCharacterId !== characterId);
            user.save();
            return characterId;
          }
          throw new Error('Character is not in favourites');
        }
        throw new Error('Invalid user');
    }).catch((err: Error) => { throw err });
  }

  getById = async (id: string) => {
    return UserModel.findById(id);
  }
}