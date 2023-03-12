import PokemonCard from "./PokemonCard"
import { motion } from "framer-motion"
function CardModal({ pokemon, caught, setShowCaughtCard }) {
    const transition = {
        scale: {
            duration: 2
        },
        opacity: {
            duration: 0.8
        }
    }

    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: [0, 0, 0, 1] },
        exit: { opacity: 0 }
    }
    return (

        <motion.div className='modal' onClick={() => setShowCaughtCard(null)} initial={animation.initial} animate={animation.animate} exit={animation.exit} transition={transition}><PokemonCard pokemon={pokemon} caught={true} /></motion.div>

    )
}
export default CardModal;