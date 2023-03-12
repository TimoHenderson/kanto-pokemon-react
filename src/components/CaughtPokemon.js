import React from "react";
import "./CaughtPokemon.css"
import PokemonSprite from "./PokemonSprite";

function CaughtPokemon({ pokemonList, pokemonCaught }) {
    const pokeNodes = pokemonList.filter(p => pokemonCaught.includes(p.id)).map((p) => {
        return <PokemonSprite key={p.id} pokemon={p} />
    });
    return (
        <div className="caughtPokemon">
            {pokeNodes}
        </div>
    )
}
export default CaughtPokemon;