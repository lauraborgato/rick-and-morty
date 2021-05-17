import axios from 'axios';
import { inject, injectable } from 'inversify';
import TYPES from '../helpers/types';
import { charactersUrl, episodeUrl, locationsUrl } from '../helpers/utils/config';
import CharacterResponse from '../model/ApiModels/characterResponse';
import Character from '../model/DataModel/character';
import CharacterDetails from '../model/DataModel/characterDetail';
import Episode from '../model/DataModel/episode';
import Location from '../model/DataModel/location';
import { User, UserModel } from '../model/DataModel/user';
import { UserService } from './user';

@injectable()
export class CharacterService {
  constructor( @inject(TYPES.AuthService) private userService: UserService) { }

  private getIdFromUrl = (url: string) => {
    return url.substring(url.lastIndexOf('/') + 1, url.length);
  }

  private getIdsFromUrls = (urls: string[]) => {
    return urls.map((url: string) => this.getIdFromUrl(url)).join()
  }

  private getLocation = (locationData: any): Location => {
    if(locationData){
      return new Location(
        locationData.id, 
        locationData.name, 
        locationData.type, 
        locationData.dimension
      );
    }
    return new Location();
  }

  private getCharacters = (characters: Array<any>, user: User ): Character[] => {
    return characters.map((character) => {
      return new Character(
        character.id, 
        character.name, 
        character.status, 
        character.species, 
        character.type, 
        character.gender, 
        character.origin.name, 
        character.location?.name, 
        character.image, 
        user.favouriteCharacters.includes(character.id)
      )
    })
   
  }

  findAll = async (userId: string, page?: number): Promise<CharacterResponse> => {
    return axios.get(charactersUrl.concat((page ? `?page=${page}`: '')))
    .then(async (response) => {
        const responseCharacters = response.data.results;
        const user = await this.userService.getById(userId);
          
        if(user) {
          return new CharacterResponse(
            response.data.info.pages,
            page || 1,
            this.getCharacters(responseCharacters, user)
          );
        }
       throw new Error('Invalid user');
    })
    .catch((err: Error) => {
      throw err;
    })
  }

  findById = async (userId: string, id: number): Promise<CharacterDetails> => {
    let characterDetail = new CharacterDetails();
    return axios.get(`${charactersUrl}/${id}`)
      .then(async (response: any) => {
        const user = await this.userService.getById(userId);
        if(user) {
          characterDetail.character = this.getCharacters([response.data], user)[0];
        } else {
          throw new Error('Invalid user');
        }
        
        let promiseGetLocation;
        if (response.data.origin.url || response.data.location.url) {
          promiseGetLocation = axios.get(`${locationsUrl}/${this.getIdsFromUrls([response.data.origin.url, response.data.location.url])}`);
        } else {
          promiseGetLocation = new Promise((resolve, reject) => resolve({data:[]}))
        }

        return Promise.all([
          promiseGetLocation,
          axios.get(`${episodeUrl}/${this.getIdsFromUrls( response.data.episode)}`)
        ]);
      })
      .then((promiseResponse: any) => {
        characterDetail.origin = this.getLocation(promiseResponse[0].data[0]);
        characterDetail.location = this.getLocation(promiseResponse[0].data[1]);
        
        if(promiseResponse[1].data && promiseResponse[1].data.length > 0){
          characterDetail.episode = promiseResponse[1].data.map((episode: any) => new Episode(episode.id, episode.name, episode.air_date, episode.episode));
        } else {
          characterDetail.episode = promiseResponse[1].data 
            ? [new Episode(promiseResponse[1].data.id, promiseResponse[1].data.name, promiseResponse[1].data.air_date, promiseResponse[1].data.episode)]
            : [];
        }

        return characterDetail;
      })
      .catch((err: Error) => {
        throw err; 
      });
  }

  addToFavourite = async (userId: string, characterId: number): Promise<number> => {
    return this.userService.addFavouriteToUser(userId, characterId);
  }

  removeFavouritesFromUser = async (userId: string, characterId: number): Promise<number> => {
    return this.userService.removeFavouriteFromUser(userId, characterId);
  }
}