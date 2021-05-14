import express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response } from "inversify-express-utils";
import TYPES from '../helpers/types';
import Session from '../model/session';
import { User } from '../model/user';
import { AuthService } from '../service/auth';

@controller("/auth")
export class AuthController implements interfaces.Controller {

  constructor( @inject(TYPES.AuthService) private userService: AuthService) { }

  @httpPost("/login")
  async login (@request() req: express.Request, @response() res: express.Response) {
    return this.userService.validateUser({name: req.body.name, email: req.body.email, password: req.body.password } as User)
      .then((response: Session) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(401).json(err);
      });
  } 

  @httpPost("/signup")
  async signup (@request() req: express.Request, @response() res: express.Response) {
    return this.userService.create({name: req.body.name, email: req.body.email, password: req.body.password } as User)
      .then((response: Session) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(401).json(err);
      });
  } 
}