import React, { useState, useEffect } from "react";
import PokemonStage from "./PokemonStage";

function PokemonGame({ pokemonList, setPokemonOut, pokemonOut, catchPokemon, pokemonCaught }) {

    useEffect(() => {
        function spawnPokemon() {

            const rando = getRandomPokemon();
            if (rando !== undefined) { setPokemonOut([...pokemonOut, rando]) }
        }
        if (pokemonOut.length < 10) {
            spawnPokemon();
        }

    }, [pokemonOut, pokemonList, pokemonCaught])

    // function spawnFirstPokemon() {
    //     console.log("spawnFirst", pokemonList);


    //     spawnPokemon()
    // }
    // async function spawnPokemon() {
    //     setTimeout(spawnPokemon, 2000);
    //     if (pokemonOut.length < 11) {
    //         setPokemonOut([...pokemonOut, getRandomPokemon()])
    //     }
    // }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomPokemon() {
        console.log(pokemonList);
        const filtered = pokemonList.filter((p) => !pokemonCaught.includes(p.id)).map(p => p.id);
        const chosen = filtered[getRandomInt(filtered.length)]
        console.log("chosen", chosen);
        return chosen;


    }

    if (pokemonOut.length > 0) {
        console.log("in real Return", pokemonOut);
        return <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} />
    } else {
        return <h1>Loading</h1>
    }


    // return <h1>{pokemonOut}</h1>
}

export default PokemonGame;