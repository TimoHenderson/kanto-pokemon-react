import { Draggable } from 'react-drag-and-drop'
import './Pokeball.css'
function PokeBall() {
    return (
        <div className='pokeballBar'>
            <Draggable type="pokeball" className="pokeball">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />
            </Draggable>
        </div>
    )
}
export default PokeBall;