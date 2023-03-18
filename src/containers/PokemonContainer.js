import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import PokemonGame from '../components/PokemonGame';
import Pokedex from '../components/Pokedex';


function PokemonContainer() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonCaught, setPokemonCaught] = useState([]);
    const [caughtFilters, setCaughtFilters] = useState({ uncaught: false, caught: true });
    const [typeFilters, setTypeFilters] = useState({});
    const [viewPokedex, setViewPokedex] = useState(false);


    useEffect(() => {
        getPokemon();
    }, []);

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
            pokemonList.sort((a, b) => a.id - b.id)
            return pokemonList;
        }
        const genData = await getGenData();
        const pokemonList = await getPokemonData();
        setPokemonList(pokemonList);
    }

    const transition = {
        opacity: {
            duration: 5
        }
    }

    return (
        <div>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: [1, 1, 0], transitionEnd: { display: "none" } }} transition={transition} className='instructions'>Catch'em All!(Grab the Poke-Ball)</motion.h1>
            <button style={{ position: "fixed", top: "5px", right: "20px", zIndex: "10" }} onClick={() => setViewPokedex(!viewPokedex)}>{viewPokedex ? "Game" : "Pokedex"}</button>
            {pokemonList && <PokemonGame pokemonList={pokemonList} pokemonCaught={pokemonCaught} setPokemonCaught={setPokemonCaught} />}
            {viewPokedex && pokemonList && <Pokedex typeFilters={typeFilters} setTypeFilters={setTypeFilters} caughtFilters={caughtFilters} setCaughtFilters={setCaughtFilters} pokemonList={pokemonList} pokemonCaught={pokemonCaught} />}
        </div >

    )
}
export default PokemonContainer;