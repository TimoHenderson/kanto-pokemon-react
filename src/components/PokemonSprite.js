import React from "react";
import "./PokemonSprite.css"

function PokemonSprite({ pokemon }) {
    return (
        <div className="pokemonSprite still" >
            <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />
        </div>
    )
}
export default PokemonSprite;