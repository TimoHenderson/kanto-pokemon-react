import React, { useEffect } from "react";
import { Droppable } from 'react-drag-and-drop'
import PokemonSprite from "./PokemonSprite";
import { motion } from "framer-motion"
import "./PokemonSprite.css"
import { getRandomInt, getRandomArbitrary } from "../helpers/getRandomNumber"


function MovingPokemonSprite({ pokemon, catchPokemon, stage }) {
    useEffect(() => {
        if (stage.current) {

        }
    }, [stage])

    const moveTypes = ["linear",
        "easeIn", "easeOut", "easeInOut",
        "circIn", "circOut", "circInOut",
        "backIn", "backOut", "backInOut",
        "anticipate"]

    const movePokemon = {
        y: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "backOut"
        },
        x: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "backOut",


        },
        opacity: {
            duration: 0.8
        },
        rotate: {
            duration: 0.8,
            repeat: Infinity
        },
        scale: {
            duration: 0.8
        },




    };

    function randomizeMovement() {
        movePokemon.y.duration = getRandomArbitrary(5, 11);
        movePokemon.x.duration = getRandomArbitrary(5, 11);
        const easeType = moveTypes[getRandomInt(0, moveTypes.length)];
        movePokemon.y.ease = easeType;
        movePokemon.x.ease = easeType;
    }

    randomizeMovement();

    if (stage.current !== null) {

        let stageWidth = `${stage.current.offsetWidth - 70}px`
        let stageHeight = `${stage.current.offsetHeight - 70}px`

        const animate = {
            opacity: 1,
            x: ["20px", stageWidth],
            y: ["20px", stageHeight]

        }
        return (
            <motion.div
                style={{ position: "absolute" }}
                transition={movePokemon}
                initial={{ opacity: 0 }}
                animate={animate}
                exit={{
                    opacity: 0,
                    rotate: 720,
                    scale: 0
                }}>
                <Droppable className="pokemonSprite"
                    types={["pokeball"]}
                    onDrop={() => catchPokemon(pokemon)}>
                    <PokemonSprite pokemon={pokemon} />
                </Droppable>
            </motion.div >
        )
    } else {
        return <h1>Loading...</h1>
    }
}
export default MovingPokemonSprite;