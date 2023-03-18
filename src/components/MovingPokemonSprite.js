import React, { useMemo, useRef, useEffect } from "react";
import PokemonSprite from "./PokemonSprite";
import { motion } from "framer-motion"
import "./PokemonSprite.css"
import { getRandomInt, getRandomArbitrary } from "../helpers/getRandomNumber"


function overlaps(a, b) {
    if (b.x === 0 || b.y === 0) return false;
    if (a.left >= b.right || b.left >= a.right) return false;
    if (a.top >= b.bottom || b.top >= a.bottom) return false;
    return true;
}

function MovingPokemonSprite({ pokemon, catchPokemon, stage, pokeballRect }) {
    const sprite = useRef(null);
    const exit = useMemo(() => {
        return {
            opacity: 0,
            rotate: 1920,
            scale: 0,
            transition: {
                rotate: {
                    duration: 1.5
                },
                opacity: {
                    ease: 'easeIn',
                    duration: 1.5
                },
                scale: {
                    duration: 1,

                }
            }
        }
    }, [])


    useEffect(() => {
        function handleCatchPokemon(boundingRect) {
            const spriteCenter = {
                x: boundingRect.left + (boundingRect.right - boundingRect.left) / 2,
                y: boundingRect.top + (boundingRect.bottom - boundingRect.top) / 2
            }
            exit.x = boundingRect.left;
            exit.y = boundingRect.top;
            catchPokemon(pokemon, spriteCenter);
        }
        if (pokeballRect && sprite.current) {
            const boundingRect = sprite.current.getBoundingClientRect()
            if (overlaps(boundingRect, pokeballRect)) {
                handleCatchPokemon(boundingRect);
                console.log();
            }
        }
    }, [pokeballRect, catchPokemon, exit, pokemon])


    const pokeMove = useMemo(() => {
        let stageWidth = stage.width;
        let stageHeight = stage.height;

        const moveTypes = ["linear",
            "easeIn", "easeOut", "easeInOut",
            "circIn", "circOut", "circInOut",
            "backIn", "backOut", "backInOut",
            "anticipate"]

        function randomizeModifiers() {
            modifiers.initial.x = getRandomArbitrary(0, 1);
            modifiers.initial.y = getRandomArbitrary(0, 1);
            const numKeyFramesX = getRandomInt(3, 8)
            for (let i = 0; i < numKeyFramesX; i++) {
                modifiers.keyFrames.x.push(getRandomArbitrary(0, 1));
            }
            const numKeyFramesY = getRandomInt(3, 5)
            for (let i = 0; i < numKeyFramesY; i++) {
                modifiers.keyFrames.y.push(getRandomArbitrary(0, 1));
            }
        }

        const modifiers = {
            initial: {
                x: 0, y: 0
            },
            keyFrames: {
                x: [],
                y: []
            }
        }

        randomizeModifiers();
        const animate = {
            opacity: 1
        }
        animate['x'] = modifiers.keyFrames.x.map((modifier) => {
            return `${Math.floor((stageWidth - 40) * modifier)}px`
        })
        animate['y'] = modifiers.keyFrames.y.map((modifier) => {
            return `${Math.floor((stageHeight - 40) * modifier)}px`
        })

        const transition = {
            y: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "backOut"
            },
            x: {
                duration: 11,
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
            }
        };

        function randomizeMovement() {
            const minY = animate.y.length / 3 * 5;
            const maxY = animate.y.length / 3 * 11;
            transition.y.duration = getRandomArbitrary(minY, maxY);
            const minX = animate.x.length / 3 * 5;
            const maxX = animate.x.length / 3 * 11;
            transition.x.duration = getRandomArbitrary(minX, maxX);
            const easeType = moveTypes[getRandomInt(0, moveTypes.length)];
            transition.y.ease = easeType;
            transition.x.ease = easeType;
        }
        randomizeMovement();
        const initial = {
            opacity: 0,
        }

        return {
            initial: initial,
            animate: animate,
            transition: transition,
        }
    }, [stage])

    if (stage.current !== null) {
        return (
            <motion.div ref={sprite}
                style={{ position: "absolute" }}
                transition={pokeMove.transition}
                initial={pokeMove.initial}
                animate={pokeMove.animate}
                exit={exit}>

                <PokemonSprite pokemon={pokemon} />

            </motion.div >
        )
    } else {
        return <h1>Loading...</h1>
    }
}
export default MovingPokemonSprite;