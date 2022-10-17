import { useEffect, useState, useRef } from 'react'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { msgDisplayed } from '../actions/messagesActions'
import { motion } from 'framer-motion'
import { divContainerVariants } from '../animations/motion'
import {fetchMessages} from '../actions/messagesActions'

const ChatMessages = ({ activeMatch }) => {

    const { userData } = useSelector(state => state.userData)
    const { messages } = useSelector(state => state.messages)
    const dispatch = useDispatch()
    const [msgsToRender, setMsgsToRender] = useState(messages)
    const newMessages = useSelector(state => state.newMessages)
   

    useEffect(() => {
        
        setMsgsToRender(messages)
       
        dispatch(msgDisplayed(activeMatch, userData._id))
        
        
        return () => {
            setMsgsToRender([])
            
        }
    }, [messages,newMessages])




    const renderMessages = () => {
        let msgs = [...msgsToRender]?.filter(message => ((message.from === userData._id && message.to === activeMatch) || (message.from === activeMatch && message.to === userData._id)))

        return msgs.map((message, index) => {
            const { from, to, created, body, displayed, _id } = message
            return <Message
                key={_id}
                from={from}
                to={to}
                created={created}
                body={body}
                displayed={displayed}
                msgId={_id}
                last={(index) === msgs.length - 1 ? true : false} />
        })

    }

    return (
        <>
            <motion.div
                key={"chatmessageskey"}
                variants={divContainerVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className="chat-messages">
                {renderMessages()}
            </motion.div>
        </>
    );
}

export default ChatMessages;