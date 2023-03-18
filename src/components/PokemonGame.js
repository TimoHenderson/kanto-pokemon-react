import React, { useEffect, useState } from "react";

import PokemonStage from "./PokemonStage";
import CaughtPokemon from "./CaughtPokemon";
import CardModal from "./CardModal";
import PokeBalls from "./Pokeballs";
import MathsGame from "./MathsGame";



function PokemonGame({ pokemonList, pokemonCaught, setPokemonCaught }) {
    const [maxPokemonOut, setMaxPokemonOut] = useState(0);
    const [pokemonOut, setPokemonOut] = useState([]);
    const [showCaughtCard, setShowCaughtCard] = useState(null);
    const [showMathsGame, setShowMathsGame] = useState(false);
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

    useEffect(() => {
        if (pokeballRect && !caughtPokemonPos) {
            setPokeballRect(null);
        }
    }, [pokeballRect, caughtPokemonPos])
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
    function throwPokeball(rect) {
        console.log("throwPokeball")
        setPokeballRect(rect);
    }

    function spawnPokeball() {
        setPokeballIds([...pokeballIds, Date.now()])
    }
    function hideCaughtCard() {
        setShowCaughtCard(null);
    }

    if (pokeballIds.length === 0 && !showMathsGame && !showCaughtCard) setShowMathsGame(true);
    if (showMathsGame && pokeballIds.length === 5) setShowMathsGame(false);
    if (pokemonList && maxPokemonOut === 0) setMaxPokemonOut(1);
    if (pokemonOut.length < maxPokemonOut) spawnPokemon();

    return (
        <div>
            <PokemonStage catchPokemon={catchPokemon} pokemonList={pokemonList} pokemonOut={pokemonOut} pokeballRect={pokeballRect} />
            <PokeBalls pokeballIds={pokeballIds} throwPokeball={throwPokeball} caughtPokemonPos={caughtPokemonPos} removePokeball={removePokeball} spawnPokeball={spawnPokeball} />
            <CaughtPokemon pokemonList={pokemonList} pokemonCaught={pokemonCaught} />
            {showCaughtCard && <CardModal pokemon={showCaughtCard} caught={true} hideCaughtCard={hideCaughtCard} />}
            {showMathsGame && <MathsGame spawnPokeball={spawnPokeball} pokeballIds={pokeballIds} setShowMathsGame={setShowMathsGame} />}
        </div>
    )
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default PokemonGame;