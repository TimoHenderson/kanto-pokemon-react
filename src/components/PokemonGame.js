import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PokemonStage from "./PokemonStage";
import CaughtPokemon from "./CaughtPokemon";
import CardModal from "./CardModal";
import PokeBalls from "./Pokeballs";



function PokemonGame({ pokemonList, pokemonCaught, setPokemonCaught }) {
    const [maxPokemonOut, setMaxPokemonOut] = useState(0);
    const [pokemonOut, setPokemonOut] = useState([]);
    const [showCaughtCard, setShowCaughtCard] = useState(null);
    const [pokeballRect, setPokeballRect] = useState(null);
    const [caughtPokemonPos, setCaughtPokemonPos] = useState(null);
    const [pokeballIds, setPokeballIds] = useState([1, 2])

    useEffect(() => {
        async function staggerPokemon() {
            if (pokemonOut.length <= maxPokemonOut && pokemonOut.length < 15) {
                await delay(Math.random() * (7000 - 3000) + 3000);
                setMaxPokemonOut(pokemonOut.length + 1);
            }
        }
        staggerPokemon();
    }, [pokemonOut, maxPokemonOut])

    function getRandomPokemon() {
        const filtered = pokemonList.filter((p) => !pokemonCaught.includes(p.id)).map(p => p.id);
        const chosen = filtered[Math.floor(Math.random() * filtered.length)]
        return chosen;
    }

    function spawnPokemon() {
        const rando = getRandomPokemon();
        if (rando !== undefined) { setPokemonOut([...pokemonOut, rando]) }
    }

    function catchPokemon(pokemon, pokemonPos) {
        if (!pokemonCaught.includes(pokemon.id)) {
            const newCaughtList = [...pokemonCaught, pokemon.id];
            setPokemonCaught(newCaughtList);
        }
        if (pokemonOut.includes(pokemon.id)) {
            const newOutList = [...pokemonOut];
            newOutList.splice(newOutList.indexOf(pokemon.id), 1)
            setPokemonOut(newOutList);
        }
        setShowCaughtCard(pokemon);
        setCaughtPokemonPos(pokemonPos);
        setPokeballRect(null);
    }
    function removePokeball(id) {
        const newPokeballIds = [...pokeballIds];
        newPokeballIds.splice(newPokeballIds.indexOf(id), 1);
        setPokeballIds(newPokeballIds);
        setCaughtPokemonPos(null);
    }
    function throwPokeball(rect, id) {
        console.log("throwPokeball")
        setPokeballRect(rect);
    }

    function spawnPokeball() {
        setPokeballIds([...pokeballIds, crypto.randomUUID()])
    }


    if (pokemonList && maxPokemonOut === 0) setMaxPokemonOut(1);
    if (pokemonOut.length < maxPokemonOut) spawnPokemon();

    return (
        <div>
            <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} pokeballRect={pokeballRect} />
            <PokeBalls pokeballIds={pokeballIds} throwPokeball={throwPokeball} caughtPokemonPos={caughtPokemonPos} removePokeball={removePokeball} />
            <button onClick={spawnPokeball}>pokeball</button>
            <CaughtPokemon pokemonList={pokemonList} pokemonCaught={pokemonCaught} />
            {showCaughtCard && <AnimatePresence>
                <CardModal pokemon={showCaughtCard} caught={true} setShowCaughtCard={setShowCaughtCard} />
            </AnimatePresence>}
        </div>
    )
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default PokemonGame;