import * as express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import TYPES from '../helpers/types';
import { AuthService } from '../service/auth';

@controller("/auth")
export class AuthController implements interfaces.Controller {
  private postRepository: AuthService;
  constructor(@inject(TYPES.AuthService) postRepository: AuthService) {
    this.postRepository = postRepository;
    console.log('controller created');
  }
  
  @httpGet("/")
  public async index (@request() req: express.Request, @response() res: express.Response) {
    try {
      const posts = await this.postRepository.findAll();
      console.log('service called');
      res.status(200).json(posts);
    } catch(error) {
      res.status(400).json(error);
    }
  }
}