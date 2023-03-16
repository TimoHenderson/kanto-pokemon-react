import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import PokemonGame from '../components/PokemonGame';
import Pokedex from '../components/Pokedex';
import CardModal from '../components/CardModal';

function PokemonContainer() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonOut, setPokemonOut] = useState([]);
    const [pokemonCaught, setPokemonCaught] = useState([]);
    const [caughtFilters, setCaughtFilters] = useState({ uncaught: false, caught: true });
    const [typeFilters, setTypeFilters] = useState({});
    const [maxPokemonOut, setMaxPokemonOut] = useState(0);
    const [viewPokedex, setViewPokedex] = useState(false);
    const [showCaughtCard, setShowCaughtCard] = useState(null);
    const [pokeballPos, setPokeballPos] = useState(null);
    const [caughtPokemonPos, setCaughtPokemonPos] = useState(null);

    useEffect(() => {
        getPokemon();
        setMaxPokemonOut(1);
    }, []);

    useEffect(() => {
        async function staggerPokemon() {
            if (pokemonOut.length <= maxPokemonOut && pokemonOut.length < 15) {
                await delay(Math.random() * (7000 - 3000) + 3000);
                setMaxPokemonOut(pokemonOut.length + 1);
            }
        }
        staggerPokemon();
    }, [pokemonOut, maxPokemonOut])

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function getPokemon() {

        async function getGenData() {
            const response = await fetch("https://pokeapi.co/api/v2/generation/1");
            const genData = await response.json();
            const types = genData.types.map(type => type.name);
            const typeFilters = {};
            types.forEach(type => typeFilters[type] = true);
            setTypeFilters(typeFilters);
            return genData;
        }

        async function getPokemonData() {
            const pokemonPromises = genData.pokemon_species.map(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const pokeData = await res.json();
                const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
                // pokeData["flavor_text"] = await res2.json().flavor_text_entries[1].flavor_text;
                const pokeSpeciesData = await res2.json();
                pokeData["flavor_text"] = pokeSpeciesData.flavor_text_entries[2].flavor_text
                return pokeData;
            })
            const pokemonList = await Promise.all(pokemonPromises);
            return pokemonList;
        }

        const genData = await getGenData();
        const pokemonList = await getPokemonData();
        setPokemonList(pokemonList);
    }

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
    }

    function throwPokeball(point) {
        setPokeballPos({ x: point.x, y: point.y })

    }
    const transition = {
        opacity: {
            duration: 10
        }
    }

    return (
        <div>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: [1, 1, 0], transitionEnd: { display: "none" } }} transition={transition} className='instructions'>Catch'em All!(Grab the Poke-Ball)</motion.h1>
            <button style={{ position: "fixed", top: "5px", right: "20px", zIndex: "10" }} onClick={() => setViewPokedex(!viewPokedex)}>{viewPokedex ? "Game" : "Pokedex"}</button>
            {pokemonList && <PokemonGame pokemonList={pokemonList} pokemonOut={pokemonOut} pokemonCaught={pokemonCaught} catchPokemon={catchPokemon} maxPokemonOut={maxPokemonOut} pokeballPos={pokeballPos} throwPokeball={throwPokeball} caughtPokemonPos={caughtPokemonPos} />}
            {viewPokedex && pokemonList && <Pokedex typeFilters={typeFilters} setTypeFilters={setTypeFilters} caughtFilters={caughtFilters} setCaughtFilters={setCaughtFilters} pokemonList={pokemonList} pokemonCaught={pokemonCaught} />}
            {showCaughtCard && <AnimatePresence>
                <CardModal pokemon={showCaughtCard} caught={true} setShowCaughtCard={setShowCaughtCard} />
            </AnimatePresence>}
        </div >

    )
}
export default PokemonContainer;