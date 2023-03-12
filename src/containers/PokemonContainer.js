import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import PokemonGame from '../components/PokemonGame';
import Pokedex from '../components/Pokedex';
import CardModal from '../components/CardModal';

function PokemonContainer() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonOut, setPokemonOut] = useState([]);
    const [pokemonCaught, setPokemonCaught] = useState([1, 3, 12]);
    const [caughtFilters, setCaughtFilters] = useState({ uncaught: true, caught: true });
    const [typeFilters, setTypeFilters] = useState({});
    const [maxPokemonOut, setMaxPokemonOut] = useState(0);
    const [viewPokedex, setViewPokedex] = useState(false);
    const [showCaughtCard, setShowCaughtCard] = useState(null);

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
        const response = await fetch("https://pokeapi.co/api/v2/generation/1");
        const genData = await response.json();

        const types = genData.types.map(type => type.name);
        console.log("types", types);
        const typeFilters = {};
        types.forEach(type => typeFilters[type] = true);
        setTypeFilters(typeFilters);

        const pokemonSpecies = genData.pokemon_species;
        let pokemonList = []
        for (let i = 0; i < pokemonSpecies.length; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSpecies[i].name}`);
            const pokemon = await response.json();
            const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonSpecies[i].name}`);
            const pokemon2 = await response2.json();
            pokemon["flavor_text"] = pokemon2.flavor_text_entries[2].flavor_text;
            pokemonList.push(pokemon)
        }
        pokemonList.sort((a, b) => a.id - b.id)
        console.log("fetching", pokemonList);
        setPokemonList(pokemonList)
    }

    function catchPokemon(pokemon) {
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
            {pokemonList && <PokemonGame pokemonList={pokemonList} pokemonOut={pokemonOut} setPokemonOut={setPokemonOut} pokemonCaught={pokemonCaught} catchPokemon={catchPokemon} maxPokemonOut={maxPokemonOut} />}
            {viewPokedex && pokemonList && <Pokedex typeFilters={typeFilters} setTypeFilters={setTypeFilters} caughtFilters={caughtFilters} setCaughtFilters={setCaughtFilters} pokemonList={pokemonList} pokemonCaught={pokemonCaught} />}
            {showCaughtCard && <AnimatePresence>
                <CardModal pokemon={showCaughtCard} caught={true} setShowCaughtCard={setShowCaughtCard} />
            </AnimatePresence>}
        </div >

    )
}
export default PokemonContainer;