export default class Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;

  constructor(_id?: number, _name?: string, _status?: string, _species?: string, _type?: string, _gender?: string, _origin?: string, _location?: string, _image?: string){
    this.id = _id || 0;
    this.name = _name || '';
    this.status = _status || '';
    this.species = _species || '';
    this.type = _type || '';
    this.gender = _gender || '';
    this.origin = _origin || '';
    this.location = _location || '';
    this.image = _image || '';
  }
}