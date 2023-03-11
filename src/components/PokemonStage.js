import React, { useEffect } from "react";
import "./PokemonStage.css"
import PokemonSprite from "./PokemonSprite";

function PokemonStage({ pokemonList, pokemonOut, catchPokemon }) {

    const spriteNodes = pokemonList.filter((p) => pokemonOut.includes(p.id)).map((pokemon) => {
        return <PokemonSprite key={pokemon.id} pokemon={pokemon} catchPokemon={catchPokemon} />
    })

    return (
        <div className="pokemonStage">
            {spriteNodes}
        </div>
    )
}
export default PokemonStage;