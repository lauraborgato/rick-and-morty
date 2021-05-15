import axios from 'axios';
import { inject, injectable } from 'inversify';
import TYPES from '../helpers/types';
import { charactersUrl, episodeUrl, locationsUrl } from '../helpers/utils/config';
import CharacterResponse from '../model/ApiModels/characterResponse';
import Character from '../model/DataModel/character';
import CharacterDetails from '../model/DataModel/characterDetail';
import Episode from '../model/DataModel/episode';
import Location from '../model/DataModel/location';
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

  private getCharacter = (character: any): Character => {
    return new Character(
      character.id, 
      character.name, 
      character.status, 
      character.species, 
      character.type, 
      character.gender, 
      character.origin.name, 
      character.location?.name, 
      character.image
    )
  }

  findAll = async (page?: string): Promise<CharacterResponse> => {
    return axios.get(charactersUrl.concat((page ? `?page=${page}`: '')))
    .then((response) => {
        const characters: Character[] = response.data.results.map((character: any) => this.getCharacter(character));

        return new CharacterResponse(
          response.data.info.pages,
          characters
        );
    })
    .catch((err: Error) => {
      throw err;
    })
  }

  findById = async (id: number): Promise<CharacterDetails> => {
    let characterDetail = new CharacterDetails();
    return axios.get(`${charactersUrl}/${id}`)
      .then((response: any) => {
        characterDetail.character = this.getCharacter(response.data);

        return Promise.all([
          axios.get(`${locationsUrl}/${this.getIdsFromUrls([response.data.origin.url, response.data.location.url])}`),
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

  addToFavourite = async (userId: number, characterId: number): Promise<number> => {
    return this.userService.addFavouriteToUser(userId, characterId);
  }

  removeFavouritesFromUser = async (userId: number, characterId: number): Promise<number> => {
    return this.userService.removeFavouriteFromUser(userId, characterId);
  }
}