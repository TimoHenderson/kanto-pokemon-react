import React from "react";
import { Droppable } from 'react-drag-and-drop'
import PokemonSprite from "./PokemonSprite";
import "./PokemonSprite.css"

function MovingPokemonSprite({ pokemon, catchPokemon }) {
    return (
        <div className="el-wrap x" >
            <div className="y" >
                <Droppable className="pokemonSprite" types={["pokeball"]} onDrop={() => catchPokemon(pokemon)}>
                    <PokemonSprite pokemon={pokemon} />
                </Droppable>
            </div>
        </div>
    )
}
export default MovingPokemonSprite;