import React from "react";
import './PokemonCard.css'

function PokemonCard({ pokemon }) {
    return (
        <div className="pokemonCard">
            <h3>{pokemon.id}</h3>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt="" />
        </div>
    );
}

export default PokemonCard;