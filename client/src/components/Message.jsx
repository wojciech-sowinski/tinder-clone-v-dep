import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const Message = ({ from, created, body, last }) => {

    const { users } = useSelector(state => state.users)

    const userAvatarImg = (id) => {
        const userImg = users[users.findIndex(user => user._id === id)].imgUrl[0]
        return userImg
    }

    const displayDate = () => {
        const date = new Date(created)
        const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`
        return formatedDate
    }

    useEffect(() => {
        document.querySelector('.last').scrollIntoView({ block: "end", inline: "nearest" })
    }, [])

    return (
        <div className={`message ${last ? 'last' : ''}`}>
            <div className='message-top-bar'>
                <span>{displayDate()}</span>
            </div>
            <div className='message-main-bar'>
                <div className="from">
                    <img src={userAvatarImg(from)} alt="user img" />
                </div>
                <div className='message-body'>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Message;