import axios from 'axios';

export const characterService = {
  getAll,
  addToFavourites
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

function addToFavourites(charcaterId, isFav) {
  var config = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
  };
  if(isFav){
    return axios.delete( `http://localhost:8080/api/characters/favourite/${charcaterId}`, config)
    .then( characterResponse => {
        return characterResponse.data;
    })
  } else {
    return axios.put( `http://localhost:8080/api/characters/favourite/${charcaterId}`, {}, config)
    .then( characterResponse => {
        return characterResponse.data;
    })
  }
 
}