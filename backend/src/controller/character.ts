import express from 'express';
import { inject } from 'inversify';
import { interfaces, controller, request, response, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import TYPES from '../helpers/types';
import CheckAuth from '../middlewear/checkAuth';
import CustomRequest from '../model/ApiModels/customRequest';
import { CharacterService } from '../service/characters';
import CharacterResponse from '../model/ApiModels/characterResponse';

@controller('/characters', CheckAuth)
export class CharacterController implements interfaces.Controller {

  constructor( @inject(TYPES.CharacterService) private characterService: CharacterService) { }

  @httpGet('/')
  async findAll (@request() req: CustomRequest, @response() res: express.Response) {
    return await this.characterService.findAll(req.query.page as string)
      .then((response: CharacterResponse) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(500).json({message: err.message});
      });
  } 

  @httpGet('/:id')
  async findById (@request() req: CustomRequest, @response() res: express.Response) {
    return this.characterService.findById(parseInt(req.params.id as string))
      .then((response: any) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(500).json({message: err.message});
      });
  } 

  @httpPut('/favourite/:id')
  async addToFavourite (@request() req: CustomRequest, @response() res: express.Response) {
    return this.characterService.addToFavourite(req.userData.id, parseInt(req.params.id))
      .then((response: any) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(500).json({message: err.message});
      });
  } 

  @httpDelete('/favourite/:id')
  async removeFromFvoutires (@request() req: CustomRequest, @response() res: express.Response) {
    return this.characterService.removeFavouritesFromUser(req.userData.id, parseInt(req.params.id))
      .then((response: any) => {
        return res.status(200).json(response);
      })
      .catch((err: Error) => {
        return res.status(500).json({message: err.message});
      });
  } 
}