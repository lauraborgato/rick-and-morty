import React, { useEffect, useState } from 'react';
import './home.scss';
import Icon from "react-hero-icon";
import { characterService } from '../../services/characterService';

function Home() {
    const [characterList, setCharacterList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
       characterService.getAll()
        .then((response) => {
            console.log(response)
            setCharacterList(response.characters);
            setTotalPages(response.pages)
            setCurrentPage(response.currentPage)
        })
    }, [])

    const onResetArray = (newList) => {
        characterService.getAll(currentPage)
            .then((response) => {
                setCharacterList(response.characters);
                setTotalPages(response.pages)
                setCurrentPage(response.currentPage)
            })
    }

    function getNextCharacters() {
        if(currentPage < totalPages) {
            characterService.getAll(currentPage +1)
            .then((response) => {
                setCharacterList(response.characters);
                setTotalPages(response.pages)
                setCurrentPage(response.currentPage)
            });
        }
    }

    function addToFavorites(characterId, isFav) {
        characterService.addToFavourites(characterId, isFav)
            .then((response) => {
               console.log(response)
               const newList = characterList.find(char => char.id === characterId)
                .isFav = !isFav;
                onResetArray(newList);
            });
        
    }
    let characters = <div>empty</div>
    if(characterList && characterList.length > 0){
        characters = characterList.map((character) => (
            <div key={character.id} className="character-card">
                <div className="character-card__image">
                    <img src={character.image} alt={character.name} />
                </div>

                <div className="character-card__description">
                    <div className="description-titles">
                        <h2 className="description-titles__title">{character.name}</h2>
                        <div className="description-titles__status">
                            <div className={character.status.toLowerCase()}></div>
                            <p>{character.status}</p>
                        </div>
                    </div>

                    <div className="description-locations">
                        <p className="description-locations__location-info">Last known location:</p>
                        <p className="description-locations__location-name">{character.location}</p>
                        <br />
                        <p className="description-locations__location-info">First seen in:</p>
                        <p className="description-locations__location-name">{character.origin}</p>
                    </div>
                    <button type="submit" onClick={() => addToFavorites(character.id, character.isFav)} className="add-favoutite">
                        <Icon className="add-favoutite__icon" icon="heart" type={character.isFav ? 'solid' : 'outline'} />
                    </button>
                </div>
            </div>
        ))
    }
    return (
        <div className="main-content">
            <div className="characters-container">
                {characters}
            </div>
            <div className="characters-pagination">
                <button type="button" onClick={getNextCharacters}>Next Page</button>
            </div>
        </div>
    )
}

export default Home;