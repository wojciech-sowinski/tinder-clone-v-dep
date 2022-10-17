import { useSelector } from 'react-redux'
import blankUser from '../img/blank-profile-picture.png'
import { motion, AnimatePresence } from 'framer-motion'
import { divContainerVariants } from '../animations/motion';

const ChatHeader = ({ activeMatch }) => {

    const { userData } = useSelector(state => state.userData)
    const { users } = useSelector(state => state.users)

    const guestImgUrl = (id) => {
        if (!id) {
            return blankUser
        } else {
            return users[users.findIndex((user) => activeMatch === user._id)].imgUrl[0]
        }
    }

    return (
        <>
            <div className="chat-header">
                <div className='user-img'>
                    <AnimatePresence exitBeforeEnter>
                        <motion.img
                            key={"chatheaderuserimgkey"}
                            variants={divContainerVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            src={userData.imgUrl[0]} alt="user img" />
                    </AnimatePresence>
                </div>
                <div><span>talk with</span></div>
                <div className='guess-img'>
                    <AnimatePresence exitBeforeEnter>
                        <motion.img
                            className='match-thumb-img'
                            key={activeMatch}
                            src={guestImgUrl(activeMatch)}
                            alt="user img"
                            variants={divContainerVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit' />
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default ChatHeader;