import React from "react";
import "./PokemonStage.css"
import MovingPokemonSprite from "./MovingPokemonSprite";

function PokemonStage({ pokemonList, pokemonOut, catchPokemon }) {

    const spriteNodes = pokemonList.filter((p) => pokemonOut.includes(p.id)).map((pokemon) => {
        return <MovingPokemonSprite key={pokemon.id} pokemon={pokemon} catchPokemon={catchPokemon} />
    })

    return (
        <div className="pokemonStage">
            {spriteNodes}
        </div>
    )
}
export default PokemonStage;