import React, { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useAnimationControls } from 'framer-motion';
import './Pokeball.css'
function PokeBall({ releasePos, throwPokeball, caughtPokemonPos }) {

    const ballSprite = useRef(null);

    const initialPosition = useMemo(() => {
        if (ballSprite.current) {
            const ballPos = ballSprite.current.getBoundingClientRect();
            return {
                x: ballPos.left + (ballPos.right - ballPos.left) / 2,
                y: ballPos.top + (ballPos.bottom - ballPos.top) / 2
            }
        }
    }, [ballSprite.current]);

    const calcAnim = useMemo(() => {
        const animate = { transition: { y: { duration: 0.5, ease: "easeIn" } } };
        const initial = {};
        if (caughtPokemonPos) {
            animate.x = caughtPokemonPos.x - initialPosition.x;
            const y = caughtPokemonPos.y - initialPosition.y;
            animate.y = [y, y - 50, y];
            console.log("animate", animate)
        } else {
            animate.x = 0;
            animate.y = 0;
            // initial = { x: 0, y: 0 }
        }
        return { animate: animate }
    }, [caughtPokemonPos, initialPosition])
    // if (releasePos) console.log("Ballsprite", ballSprite.current.)

    function handleThrow(event) {
        console.log("handleThrow")
        const ballRect = event.target.getBoundingClientRect();
        throwPokeball(ballRect);
    }

    return (
        <motion.img
            // style={{ position: "fixed" }}
            ref={ballSprite}
            drag
            animate={calcAnim.animate}
            dragTransition={{
                power: 0.2,
                min: 20,
                max: 50,
                bounceStiffness: 100
            }}
            // animate={controls}
            onDragEnd={(event) => handleThrow(event)}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />
    )
}
export default PokeBall;