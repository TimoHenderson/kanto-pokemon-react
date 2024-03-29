import React, { useState, useEffect, useRef } from "react";
import "./PokemonStage.css"
import { AnimatePresence } from "framer-motion"
import MovingPokemonSprite from "./MovingPokemonSprite";

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

function PokemonStage({ pokemonList, pokemonOut, catchPokemon, pokeballRect }) {
    const pokemonStage = useRef(null);
    const [dimensions, setDimensions] = useState({});

    useEffect(() => {

        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                width: pokemonStage.current.offsetWidth,
                height: pokemonStage.current.offsetHeight

            })

        }, 1000)
        window.addEventListener('resize', debouncedHandleResize);
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }

    }, [dimensions])

    useEffect(() => {
        function initStageSize() {
            setDimensions({
                width: pokemonStage.current.offsetWidth,
                height: pokemonStage.current.offsetHeight
            })
        }
        initStageSize();
    }, [])



    const spriteNodes = pokemonList.filter((p) => pokemonOut.includes(p.id)).map((pokemon) => {
        return <MovingPokemonSprite
            key={pokemon.id}
            pokemon={pokemon}
            catchPokemon={catchPokemon}
            stage={dimensions}
            pokeballRect={pokeballRect}
        />
    })

    return (
        <div className="pokemonStage" ref={pokemonStage}>
            <AnimatePresence>{spriteNodes}</AnimatePresence>
        </div>
    )
}
export default PokemonStage;
// "https://www.pluralsight.com/guides/re-render-react-component-on-window-resize"