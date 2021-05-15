export default class Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;

  constructor(_id: number, _name: string, _air_date: string, _episode: string) {
    this.id = _id;
    this.name = _name;
    this.air_date = _air_date;
    this.episode = _episode;
  }
}