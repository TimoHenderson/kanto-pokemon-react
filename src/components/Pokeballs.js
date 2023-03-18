import React from "react";
import { AnimatePresence } from "framer-motion";
import PokeBall from "./Pokeball";

function PokeBalls({ pokeballIds, throwPokeball, caughtPokemonPos, removePokeball, spawnPokeball }) {
    const pokeballNodes = pokeballIds.map((pokeballId) => (

        <PokeBall key={pokeballId} id={pokeballId} throwPokeball={throwPokeball} caughtPokemonPos={caughtPokemonPos} removePokeball={removePokeball} />

    ));
    return (<div> <AnimatePresence >{pokeballNodes} </AnimatePresence></div>);
}

export default PokeBalls;