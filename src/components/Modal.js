import React from "react"
import { AnimatePresence, motion } from "framer-motion"
const Modal = ({ children, clickHandler, quick }) => {

    const transition = {
        opacity: {
            duration: 0.8
        }
    }
    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: [0, 0, 0, 1] },
        exit: { opacity: 0 }
    }

    if (quick) {
        transition.opacity.duration = 0.1;
        animation.animate.opacity = 1;
    }

    return (
        <motion.div className='modal' initial={animation.initial} animate={animation.animate} exit={animation.exit} transition={transition}>
            <div onClick={clickHandler}><AnimatePresence>{children}</AnimatePresence></div>
        </motion.div>
    );
}

export default Modal;