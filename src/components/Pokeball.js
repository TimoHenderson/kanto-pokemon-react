import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Pokeball.css'
function PokeBall({ throwPokeball, caughtPokemonPos, id, removePokeball }) {

    const [thrown, setThrown] = useState(false);
    const exit = useMemo(() => ({ rotate: 1080, transition: { power: 10, y: { duration: 0.5, ease: "easeIn" } } }), []);
    const initialPosition = useMemo(() => { return {} }, [])
    const ballSprite = useRef(null);

    // useEffect(() => {
    //     if (ballSprite.current) {
    //         const ballPos = ballSprite.current.getBoundingClientRect();
    //         console.log("ballPos", ballPos)
    //         initialPosition.x = ballPos.left + (ballPos.right - ballPos.left) / 2;
    //         initialPosition.y = ballPos.top + (ballPos.bottom - ballPos.top) / 2;
    //     }
    // }, [initialPosition, ballSprite]);

    function setStartPoint(event, info) {
        const ballRect = event.target.getBoundingClientRect();
        initialPosition.x = ballRect.left + (ballRect.right - ballRect.left) / 2;
        initialPosition.y = ballRect.top + (ballRect.bottom - ballRect.top) / 2;
    }

    useEffect(() => {
        function handleRemovePokeball() {
            exit.x = caughtPokemonPos.x - initialPosition.x;
            const y = caughtPokemonPos.y - initialPosition.y;
            exit.y = [y, y - 50, y];
            removePokeball(id)
        }
        if (thrown && caughtPokemonPos) {
            handleRemovePokeball()
        }
    }, [thrown, caughtPokemonPos, exit, removePokeball, id, initialPosition])

    function handleThrow(event) {
        console.log("handleThrow")
        const ballRect = event.target.getBoundingClientRect();
        throwPokeball(ballRect);
        setThrown(true);
    }

    return (
        <motion.img
            ref={ballSprite}
            drag
            dragSnapToOrigin
            exit={exit}
            dragTransition={{
                power: 0.2,
                min: 20,
                max: 50,
                bounceStiffness: 100
            }}
            onDragStart={(event, info) => setStartPoint(event, info)}
            onDragEnd={(event) => handleThrow(event)}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />
    )
}

export default PokeBall;