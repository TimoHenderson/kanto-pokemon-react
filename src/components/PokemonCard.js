import React from "react";

import './PokemonCard.css'

function PokemonCard({ pokemon, caught, catchPokemon }) {
    return (

        <div onClick={() => catchPokemon(pokemon)} className="pokemonCard">
            <h3>{pokemon.id}</h3>
            <h3>{pokemon.name}</h3>
            <img className={caught ? "caught" : "notCaught"} src={pokemon.sprites.front_default} alt="" />
        </div>

    );
}

export default PokemonCard;