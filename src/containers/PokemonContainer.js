import React, { useState, useEffect } from 'react';
import FilterButtonsBox from '../components/FilterButtonsBox';
import PokeBall from '../components/Pokeball';
import PokemonList from '../components/PokemonList';
import PokemonGame from '../components/PokemonGame';

function PokemonContainer() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonOut, setPokemonOut] = useState([25, 10]);
    const [pokemonCaught, setPokemonCaught] = useState([1, 3, 12]);
    const [caughtFilters, setCaughtFilters] = useState({ uncaught: true, caught: true });
    const [typeFilters, setTypeFilters] = useState({});

    useEffect(() => {
        getPokemon();
    }, []);




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
    }


    return (
        <div><PokeBall />
            {pokemonList && <PokemonGame pokemonList={pokemonList} pokemonOut={pokemonOut} setPokemonOut={setPokemonOut} pokemonCaught={pokemonCaught} catchPokemon={catchPokemon} />}
            <FilterButtonsBox typeFilters={typeFilters} setTypeFilters={setTypeFilters} caughtFilters={caughtFilters} setCaughtFilters={setCaughtFilters} />
            <PokemonList typeFilters={typeFilters} caughtFilters={caughtFilters} pokemonList={pokemonList} pokemonCaught={pokemonCaught} catchPokemon={catchPokemon} />

        </div>
    )
}
export default PokemonContainer;