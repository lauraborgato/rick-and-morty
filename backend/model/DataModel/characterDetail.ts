import Character from "../DataModel/character";
import Episode from "./episode";
import Location from './location';

export default class CharacterDetails {
  character: Character;
  origin: Location;
  location: Location;
  episode: Episode[];

  constructor( _character?: Character, _origin?: Location, _location?: Location, _episode?: Episode[]) {
    this.character = _character || new Character();
    this.origin = _origin || new Location();
    this.location = _location || new Location();
    this.episode = _episode || [];
  }
}