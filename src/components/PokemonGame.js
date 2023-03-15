import React, { useEffect, useState } from "react";
import PokemonStage from "./PokemonStage";
import PokeBall from "./Pokeball";
import CaughtPokemon from "./CaughtPokemon";
function PokemonGame({ pokemonList, setPokemonOut, pokemonOut, catchPokemon, pokemonCaught, maxPokemonOut }) {
    const [pokeballPos, setPokeballPos] = useState({ x: 0, y: 0 })
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

    function handleThrow(point) {
        setPokeballPos({ x: point.x, y: point.y });
    }

    return <div>
        <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} pokeballPos={pokeballPos} />
        <PokeBall handleThrow={handleThrow} />
        <CaughtPokemon pokemonList={pokemonList} pokemonCaught={pokemonCaught} />
    </div>
}

export default PokemonGame;