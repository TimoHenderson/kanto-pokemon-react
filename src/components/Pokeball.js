import { Draggable } from 'react-drag-and-drop';
import { motion } from 'framer-motion';
import './Pokeball.css'
function PokeBall({ handleThrow }) {
    return (



        <motion.img drag={true} onDragEnd={
            (event, info) => handleThrow(info.point)} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" />



    )
}
export default PokeBall;