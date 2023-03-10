import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';

function PokemonContainer() {
    const [pokemonList, setPokemonList] = useState([])

    useEffect(() => {
        getPokemon();
    }, []);

    async function getPokemon() {
        const response = await fetch("https://pokeapi.co/api/v2/generation/1");
        const genData = await response.json();
        // const pokemonList = await genData.pokemon_species.map(async function (species) {
        //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`);
        //     const data = await response.json();
        //     return data;
        // })
        const pokemonSpecies = genData.pokemon_species;

        let pokemonList = []
        for (let i = 0; i < pokemonSpecies.length; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSpecies[i].name}`);
            const pokemon = await response.json();
            pokemonList.push(pokemon)
        }
        pokemonList.sort((a, b) => a.id - b.id);
        setPokemonList(pokemonList)
    }

    return (
        <div>
            <h1>PokemonContainer</h1>
            <PokemonList pokemonList={pokemonList} />
        </div>
    )
}
export default PokemonContainer;