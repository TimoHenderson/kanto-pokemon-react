import React, { useRef } from "react";
import "./PokemonStage.css"
import { motion, AnimatePresence } from "framer-motion"
import MovingPokemonSprite from "./MovingPokemonSprite";

function PokemonStage({ pokemonList, pokemonOut, catchPokemon }) {
    const pokemonStage = useRef(null);

    const spriteNodes = pokemonList.filter((p) => pokemonOut.includes(p.id)).map((pokemon) => {
        return <MovingPokemonSprite
            key={pokemon.id}
            pokemon={pokemon}
            catchPokemon={catchPokemon}
            stage={pokemonStage}
        />
    })

    return (
        <div className="pokemonStage" ref={pokemonStage}>
            <AnimatePresence>{spriteNodes}</AnimatePresence>
        </div>
    )
}
export default PokemonStage;