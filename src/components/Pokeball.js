import React, { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useAnimationControls } from 'framer-motion';
import './Pokeball.css'
function PokeBall({ releasePos, throwPokeball, caughtPokemonPos }) {
    // const [animate, setAnimate] = useState({})
    const ballSprite = useRef(null);
    // const controls = useAnimationControls()
    // useEffect(() => {
    //     if (releasePos) {
    //         animate.x = releasePos.x
    //         console.log(ballSprite.current)
    //     }
    // }, [releasePos])
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
        const animate = {};
        const initial = {};
        if (caughtPokemonPos) {
            const ballPos = ballSprite.current.getBoundingClientRect();
            const { left, top, right, bottom } = ballPos;
            console.log(left, top, releasePos)
            console.log("initialPos", initialPosition)
            initial.x = releasePos.x - left;
            initial.y = top - releasePos.y;
            animate.x = caughtPokemonPos.x - initialPosition.x;
            const y = caughtPokemonPos.y - initialPosition.y;
            animate.y = [y, y - 40, y];
            console.log("animate", animate)
        } else {
            animate.x = 0;
            animate.y = 0;
            // initial = { x: 0, y: 0 }
        }
        return { animate: animate }
    }, [caughtPokemonPos, initialPosition])
    // if (releasePos) console.log("Ballsprite", ballSprite.current.)

    function handleThrow(point) {
        throwPokeball(point);

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
            onDragEnd={(event, info) => handleThrow(info.point)}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />
    )
}
export default PokeBall;