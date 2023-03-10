import React from "react";
import PokemonCard from "./PokemonCard";
import './PokemonList.css'

function PokemonList({ pokemonList, pokemonCaught, catchPokemon, typeFilters, caughtFilters }) {
    const filteredPokemonList = pokemonList.filter((pokemon) => {
        let typeValid = false;
        let caughtValid = false;
        const pokemonTypes = pokemon.types.map(type => type.type.name);
        for (const type of pokemonTypes) {
            if (typeFilters[type]) {
                typeValid = true;
            }
        }
        caughtValid = pokemonCaught.includes(pokemon.id) ? caughtFilters.caught : caughtFilters.uncaught;
        return typeValid && caughtValid
    })
    const pokemonNodes = filteredPokemonList.map((pokemon) => {
        return <PokemonCard key={pokemon.id} caught={pokemonCaught.includes(pokemon.id)} pokemon={pokemon} catchPokemon={catchPokemon} />
    })
    return (
        <div className="pokemonListContainer">
            <h3>Pokemon List</h3>
            <main>{pokemonNodes}</main>
        </div>
    );
}

export default PokemonList;