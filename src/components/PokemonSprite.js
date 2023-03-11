import React from "react";
import { Droppable } from 'react-drag-and-drop'
import "./PokemonSprite.css"

function PokemonSprite({ pokemon, catchPokemon }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const positionX = getRandomInt(400);
    console.log(positionX);
    const positionY = getRandomInt(200);

    return (
        <div className="el-wrap x" style={{ top: { positionY }, left: { positionX } }}>
            <div className="y" >
                <Droppable className="pokemonSprite" types={["pokeball"]} onDrop={() => catchPokemon(pokemon)}>
                    <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />
                </Droppable>
            </div>
        </div>
    )
}
export default PokemonSprite;