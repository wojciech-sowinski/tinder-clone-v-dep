import NewMessagesCounter from './newMessageCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



const UserBar = ({ firstName }) => {

    return (
        <div className='user-bar'>
            {firstName && <span>Hi, {firstName} </span>}

            <NewMessagesCounter />

            <Link to={'/onboard'}><FontAwesomeIcon icon={faCircleUser} /></Link>
        </div>
    );
}

export default UserBar;