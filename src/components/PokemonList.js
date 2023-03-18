import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import CardModal from "./CardModal";
import './PokemonList.css'

function PokemonList({ pokemonList, pokemonCaught, typeFilters, caughtFilters }) {
    const [showPokemonDetails, setShowPokemonDetails] = useState(null);
    function showPokemon(pokemon) {
        setShowPokemonDetails(pokemon);
    }
    function hidePokemon() {
        setShowPokemonDetails(null);
    }
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
        return <PokemonCard key={pokemon.id} caught={pokemonCaught.includes(pokemon.id)} pokemon={pokemon} small={true} showDetails={showPokemon} />
    })
    return (
        <div className="pokemonListContainer">
            {showPokemonDetails && <CardModal pokemon={showPokemonDetails} caught={pokemonCaught.includes(showPokemonDetails.id)} hideCaughtCard={hidePokemon} quick={true} />}
            <main>{pokemonNodes}</main>
        </div>
    );
}

export default PokemonList;