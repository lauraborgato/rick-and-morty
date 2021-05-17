import axios from 'axios';

export const characterService = {
  getAll,
  addToFavourites,
  getById
}

function getAll(page) {
  var config = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  };
  
  return axios.get( `http://localhost:8080/api/characters/${page ? `?page=${page}` : ''}`, config)
      .then( characterResponse => {
          return characterResponse.data;
      })

}

function addToFavourites(characterId, isFav) {
  var config = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  };
  if(isFav){
    return axios.delete( `http://localhost:8080/api/characters/favourite/${characterId}`, config)
    .then( characterResponse => {
        return characterResponse.data;
    })
  } else {
    return axios.put( `http://localhost:8080/api/characters/favourite/${characterId}`, {}, config)
    .then( characterResponse => {
        return characterResponse.data;
    })
  }
 
}

function getById(characterId){
  var config = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  };
  return axios.get( `http://localhost:8080/api/characters/${characterId}`, config)
  .then( characterResponse => {
      return characterResponse.data;
  })
}