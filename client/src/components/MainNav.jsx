import logo from '../img/logo-red.png'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton';
import UserBar from './UserBar';
import { NavLink } from "react-router-dom";
import '../styles/mainNav.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { divScaleInNoResize } from '../animations/motion'
import { useState } from 'react';

const MainNav = () => {

    const { userData, logged } = useSelector(state => state.userData)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => { }, [userData, logged])

    const toggleShowMenuHandle = () => {
        setShowMenu(prev => !prev)
    }
    const hideMenuHandle = () => {
        setTimeout(() => {
            setShowMenu(false)
        }, 200);
    }

    return (
        <nav className="main-nav">
            <div className='burger-button'>
                <FontAwesomeIcon onClick={toggleShowMenuHandle} icon={faBars} />
            </div>
            <NavLink to='/' >
                <div className="nav-logo-container">
                    <img src={logo} alt="" />
                    <span>Matchy Matchy®</span>
                </div>
            </NavLink>
            <ul className={showMenu ? 'show' : ''} onClick={hideMenuHandle}>

                <li>
                    <NavLink to='/' >
                        Home Page
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard' >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/onboard' >
                        Your Profile
                    </NavLink>
                </li>
                <li>
                    <LoginButton />
                </li>
                <li>
                    <RegisterButton />
                </li>
            </ul>

            <div className='login-button-container'>
                <AnimatePresence>
                    {logged ? (<motion.div variants={divScaleInNoResize}
                        initial='hidden'
                        animate='visible'
                        exit='exit'  >
                        <UserBar firstName={userData.firstName} />
                    </motion.div>) : ''}
                </AnimatePresence>
                <LoginButton />
            </div>
        </nav>
    );
}

export default MainNav;