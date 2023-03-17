import React, { useEffect, useState } from "react";
import PokemonStage from "./PokemonStage";
import PokeBall from "./Pokeball";
import CaughtPokemon from "./CaughtPokemon";
function PokemonGame({ pokemonList, pokemonOut, catchPokemon, pokemonCaught, pokeballRect, throwPokeball, caughtPokemonPos }) {
    return (
        <div>
            <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} pokeballRect={pokeballRect} />
            <PokeBall throwPokeball={throwPokeball} caughtPokemonPos={caughtPokemonPos} />
            <CaughtPokemon pokemonList={pokemonList} pokemonCaught={pokemonCaught} />
        </div>
    )
}

export default PokemonGame;