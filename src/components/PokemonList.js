import React from "react";
import PokemonCard from "./PokemonCard";
import './PokemonList.css'

function PokemonList({ pokemonList, pokemonCaught, catchPokemon }) {

    const pokemonNodes = pokemonList.map((pokemon) => {
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