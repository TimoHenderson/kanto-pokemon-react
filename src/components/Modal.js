import React from "react"
import { AnimatePresence, motion } from "framer-motion"
const Modal = ({ children, clickHandler }) => {

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
    return (<AnimatePresence>
        <motion.div className='modal' initial={animation.initial} animate={animation.animate} exit={animation.exit} transition={transition}>
            <div onClick={clickHandler}>{children}</div>
        </motion.div>
    </AnimatePresence>);
}

export default Modal;