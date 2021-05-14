import { injectable } from "inversify";
import { User, UserModel } from "../model/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Session from "../model/session";
import { secretString } from "../helpers/utils/config";

@injectable()
export class AuthService {
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
        const token = jwt.sign({ email: fetchuser.email, userId: fetchuser._id }, secretString, { expiresIn: "1h" });
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
              const token = jwt.sign({ email: user.email, userId: result._id }, secretString, { expiresIn: "1h" });
              return new Session(token, 360, result._id);
            })
            .catch(err => {
              throw err;
            });
        });
      });
  }

  findById(id: number) {
    //
  }
}