import Character from "../DataModel/character";

export default class CharacterResponse {
  constructor(public pages: number, public characters: Character[]){
    this.pages = pages;
    this. characters = characters;
  };
}