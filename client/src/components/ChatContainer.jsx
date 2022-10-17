import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateBack } from '@fortawesome/free-solid-svg-icons'
import ChatHeader from './ChatHeader'
import ChatMatches from './ChatMatches'
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { motion, AnimatePresence } from 'framer-motion'
import { divContainerVariants } from '../animations/motion';

const ChatContainer = ({ activeMatch, setActiveMatch }) => {

    const [option, setOption] = useState('matches')
    const setOptionHandle = (e) => {
        setOption("matches")
        setActiveMatch(false)
    }

    return (
        <>
            <div className="chat-container">
                <ChatHeader activeMatch={activeMatch} />
                <div className='options'>
                    <AnimatePresence >
                        {activeMatch ? (
                            <motion.button
                                key={"chatmatcheskey"}
                                variants={divContainerVariants}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                onClick={setOptionHandle}
                                className={`chat-options ${activeMatch ? 'active' : ''}`} value="matches">Back to Matches <FontAwesomeIcon icon={faRotateBack} />
                            </motion.button>
                        ) : ''}
                    </AnimatePresence>
                </div>
                <AnimatePresence exitBeforeEnter>
                    {option === 'matches' ?
                        <ChatMatches key={'chatmatcheskey'} setActiveMatch={setActiveMatch} setOption={setOption} /> : (activeMatch ? <><ChatMessages key={'chatmessageskey'} activeMatch={activeMatch} /> <ChatInput key={'chatinputkey'} activeMatch={activeMatch} /></> : '')}
                </AnimatePresence>
            </div>
        </>
    );
}

export default ChatContainer;