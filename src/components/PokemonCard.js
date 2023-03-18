import React from "react";

import './PokemonCard.css'

function PokemonCard({ pokemon, caught, small, showDetails }) {
    function handleClick(event) {
        if (small && showDetails) {
            showDetails(pokemon);
        }
    }

    return (
        <div onClick={handleClick} className={small ? "pokemonCard small" : "pokemonCard"}>
            <h3>{pokemon.id}</h3>
            <h3>{pokemon.name}</h3>
            <img className={caught ? "caught" : "notCaught"} src={pokemon.sprites.front_default} alt="" />
            {!small && <p>{pokemon.flavor_text}</p>}
        </div>

    );
}

export default PokemonCard;