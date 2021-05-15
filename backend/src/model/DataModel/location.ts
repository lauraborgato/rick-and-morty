export default class Location {
  id: number;
  name: string;
  type: string;
  dimension: string;

  constructor(_id?: number, _name?: string, _type?: string, _dimension?: string) {
    this.id = _id || 0;
    this.name = _name || '';
    this.type = _type || '';
    this.dimension = _dimension || '';
  }
}