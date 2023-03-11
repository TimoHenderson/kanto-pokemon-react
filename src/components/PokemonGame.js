import React, { useEffect } from "react";
import PokemonStage from "./PokemonStage";

function PokemonGame({ pokemonList, setPokemonOut, pokemonOut, catchPokemon, pokemonCaught, maxPokemonOut }) {

    useEffect(() => {
        function getRandomPokemon() {
            console.log(pokemonList);
            const filtered = pokemonList.filter((p) => !pokemonCaught.includes(p.id)).map(p => p.id);
            const chosen = filtered[Math.floor(Math.random() * filtered.length)]
            console.log("chosen", chosen);
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

    if (pokemonOut.length > 0) {
        console.log("in real Return", pokemonOut);
        return <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} />
    } else {
        return <h1>Loading</h1>
    }
}

export default PokemonGame;