import React, { useEffect } from "react";
import PokemonStage from "./PokemonStage";
import PokeBall from "./Pokeball";
import CaughtPokemon from "./CaughtPokemon";
function PokemonGame({ pokemonList, setPokemonOut, pokemonOut, catchPokemon, pokemonCaught, maxPokemonOut }) {

    useEffect(() => {
        function getRandomPokemon() {
            const filtered = pokemonList.filter((p) => !pokemonCaught.includes(p.id)).map(p => p.id);
            const chosen = filtered[Math.floor(Math.random() * filtered.length)]
            return chosen;
        }

        function spawnPokemon() {
            const rando = getRandomPokemon();
            if (rando !== undefined) { setPokemonOut([...pokemonOut, rando]) }
        }

        if (pokemonOut.length < maxPokemonOut) {
            spawnPokemon();
        }
    }, [pokemonOut, pokemonList, pokemonCaught, maxPokemonOut, setPokemonOut])


    return <div>

        <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} />
        <PokeBall />
        <CaughtPokemon pokemonList={pokemonList} pokemonCaught={pokemonCaught} />

    </div>
}

export default PokemonGame;