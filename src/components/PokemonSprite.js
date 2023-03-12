import React from "react";
import { motion } from "framer-motion"
import "./PokemonSprite.css"

function PokemonSprite({ pokemon }) {
    const spawnPokemon = {
        opacity: {
            duration: 1,
            ease: "easeIn"
        },
        scale: { duration: 0.8 }
    }

    return (
        <motion.div className="pokemonSprite still"
            transition={spawnPokemon}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />

        </motion.div>
    )
}
export default PokemonSprite;