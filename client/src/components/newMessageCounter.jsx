import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { divScaleInNoResize, divFlipHorizontalWithResize } from '../animations/motion'


const NewMessagesCounter = () => {

    const newMessages = useSelector(state => state.newMessages)
    const { logged } = useSelector(state => state.userData)
    const dispatch = useDispatch()

    useEffect(() => {

        if (!logged) {
            dispatch({ type: 'resetNewMessageCounter' })
        }

    }, [logged])

    return (
        <>
            <AnimatePresence >

                {newMessages != 0 && logged ? (<motion.div variants={divScaleInNoResize}
                    initial='hidden'
                    animate='visible'
                    exit='exit' >
                    <Link to='/dashboard' className="new-message-counter">
                        <div >
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>{newMessages}</span>
                        </div>
                    </Link> </motion.div>
                ) : ''}

            </AnimatePresence>
        </>

    );
}

export default NewMessagesCounter;