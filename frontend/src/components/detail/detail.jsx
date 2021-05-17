import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './detail.scss';
import { characterService } from '../../services/characterService';

function Detail() {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [character, setCharacter] = useState({});
  const [origin, setOrigin] = useState([]);
  const [location, setLocation] = useState({});
  useEffect(() => {
    characterService.getById(id)
    .then((response) => {
      setEpisodes(response.episode);
      setCharacter(response.character);
      setOrigin(response.origin);
      setLocation(response.location);
    })
  }, [id])

  let episodeList = <div>empty</div>
  if(episodes && episodes.length > 0){
    episodeList = episodes.map((episode) => (
      <div key={episode.id} className="character__profile__card__body__personal--item">
        <div className="character__profile__card__body__personal--item_episodeId">
            {episode.episode}
        </div>
        <span className="character__profile__card__body__personal--item_episode">{episode.name}, {episode.air_date} </span>
      </div>
    ))
  }

  function onChangeChar(newChar) {
    characterService.getById(newChar.id)
      .then((response) => {
        setEpisodes(response.episode);
        setCharacter(response.character);
        setOrigin(response.origin);
        setLocation(response.location);
      })
  }

  function addCharToFav() {
    characterService.addToFavourites(character.id, character.isFav)
        .then((response) => {
           const newChar = character;
           newChar.isFav = !character.isFav;
           onChangeChar(newChar);
        });
  }

  let content = <div>Loading ...</div>;
  if(character){
    content = (
      <div className="character__profile__card">
      <div className="character__profile__card__profile">
        <div className="character__profile__card__profile__header">
            <img
              src={character.image}
              alt={character.name}
            />
            <span>{character.name}</span>
        </div>
        <div className="character__profile__card__profile__buttons">
          <button
            type="button"
            onClick={addCharToFav}
            className=""
          >
            {character.isFav ? 'Remove from Favourites': 'Add to Favourites'}
          </button>
        </div>
      </div>
      <div className="character__profile__card__body">
        <h1>Profile</h1>
        <h2>Peronal Information</h2>
        <div className="character__profile__card__body__personal">
          <div className="character__profile__card__body__personal--item">
            <h2>Gender:</h2>
            <span>{character.gender}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Species:</h2>
            <span>{character.species}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Type:</h2>
            <span>{character.type ? character.type : '-'}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Status:</h2>
            <span>{character.status}</span>
          </div>
        </div>
        <h2>Origin</h2>
        <div className="character__profile__card__body__personal">
          <div className="character__profile__card__body__personal--item">
            <h2>Name:</h2>
            <span>{origin.name}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Type:</h2>
            <span>{origin.type}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Dimension:</h2>
            <span>{origin.dimension}</span>
          </div>
        </div>
        <h2>Last Known Location</h2>
        <div className="character__profile__card__body__personal">
          <div className="character__profile__card__body__personal--item">
            <h2>Name:</h2>
            <span>{location.name}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Type:</h2>
            <span>{location.type}</span>
          </div>
          <div className="character__profile__card__body__personal--item">
            <h2>Dimension:</h2>
            <span>{location.dimension}</span>
          </div>
        </div>
        <h2>Episodes</h2>
        <div className="character__profile__card__body__personal">
          {episodeList}
        </div>
      </div>
    
    </div>
    )
  }
  return (
    <div className="main-content">
     {content}
    </div>
  )
}

export default Detail;