import Character from "../DataModel/character";

export default class CharacterResponse {
  constructor(public pages: number, public currentPage: number, public characters: Character[],){
    this.pages = pages;
    this.currentPage = currentPage;
    this.characters = characters;
  };
}