import { Draggable, Droppable } from 'react-drag-and-drop'
function PokeBall() {
    return (
        <Draggable type="pokeball">
            <img width="60px" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />
        </Draggable>
    )
}
export default PokeBall;