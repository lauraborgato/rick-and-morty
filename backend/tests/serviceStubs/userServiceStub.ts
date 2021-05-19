import Session from "../../src/model/ApiModels/session";
import { User } from "../../src/model/DataModel/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretString } from "../../src/helpers/utils/config";
import { injectable } from "inversify";
import { users } from "./userStub";

@injectable()
export default class UserServicesStub {
  validateUser = async (user: User): Promise<Session> => {
    let fetchuser: any;
    return new Promise((resolve, reject) => {
      const fetchuser = users.find((fakeUser: any) => {
        return fakeUser.email === user.email;
      })
      return fetchuser ? resolve(fetchuser) : resolve(null);
    })
      .then((dbUser: any) => {
        if (!dbUser) {
          throw new Error('User name or password are incorrect');
        }
        fetchuser = dbUser;
        return dbUser.password === user.password;
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
    return new Promise((resolve, reject) => {
      const fetchUser = users.find((fakeUser: any) => {
        return fakeUser.email === user.email;
      });
      return fetchUser ? resolve(fetchUser) : resolve(null)
    })
      .then((dbUser: any) => {
        if (dbUser) {
          throw new Error('User name or password already exits');
        } 
        return bcrypt.hash(user.password, 10)
        .then((hash: string) => {
          return new Promise((resolve, reject) => {
            const newUser = {_id: 'newFakeID', name: user.name, email: user.email, password: hash, favouriteCharacters: [] }
            users.push(newUser);
            resolve(newUser);
          })
          .then((result: any) => {
            const token = jwt.sign({ email: user.email, userId: result._id }, secretString, { expiresIn: '1h' });
            return new Session(token, 360, result._id);
          })
          .catch(err => {
            throw err;
          });
        })
        .catch((err: Error) => {
          throw err;
        });
      });
  }

  addFavouriteToUser = async (userId: string, characterId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const fetchUser = users.find((fakeUser: any) => {
        return fakeUser._id === userId;
      });
      return fetchUser ? resolve(fetchUser) : resolve(null)
    })
      .then((user: any) => {
        if(user){
          if(!user.favouriteCharacters.includes(characterId)) {
            user.favouriteCharacters.push(characterId);
            // user.save();
            return characterId;
          }
          throw new Error('Character already added');
        }
        throw new Error('Invalid user');
    }).catch((err: Error) => { throw err });
  }

  removeFavouriteFromUser = async (userId: string, characterId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const fetchUser = users.find((fakeUser: any) => {
        return fakeUser._id === userId;
      });
      return fetchUser ? resolve(fetchUser) : resolve(null)
    })
      .then((user: any) => {
        if(user){
          if(user.favouriteCharacters.includes(characterId)){
            user.favouriteCharacters = user.favouriteCharacters.filter((currentCharacterId: number) => currentCharacterId !== characterId);
            // user.save();
            return characterId;
          }
          throw new Error('Character is not in favourites');
        }
        throw new Error('Invalid user');
    }).catch((err: Error) => { throw err });
  }

  getById = async (id: string) => {
    return new Promise((resolve, reject) => {
      const fetchUser = users.find((fakeUser: any) => {
        return fakeUser._id === id;
      });
      return fetchUser ? resolve(fetchUser) : resolve(null)
    })
  }
}