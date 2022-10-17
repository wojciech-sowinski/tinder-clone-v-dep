import logo from '../img/logo-red.png'
import { useSelector } from 'react-redux'
import LoginButton from '../components/LoginButton'
import RegisterButton from '../components/RegisterButton'
import '../styles/homePage.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { pageContainerVariants, divScaleIn, divContainerFade } from '../animations/motion'
import VerticalUserCarousel from '../components/VerticalUserCarousel'
import { useEffect } from 'react'



const HomePage = () => {

    const { users } = useSelector(state => state.users)
    const { logged } = useSelector(state => state.userData)


    return (
        <motion.div className="home-page"
            variants={pageContainerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'   >
            <AnimatePresence exitBeforeEnter>
                <div className='title-container'>
                    <h1>Matchy Matchy®</h1>
                    <h2>Find your <img src={logo} alt="" /> match</h2>
                    {!logged ? (<RegisterButton />) : ''}
                    {!logged ? (<LoginButton />) : ''}
                </div>

                {users.length ? (<motion.div className='vertical-sliders-container' variants={divContainerFade}
                    initial='hidden'
                    animate='visible'
                    exit='exit'  >
                    <VerticalUserCarousel key={'vertSlider1'} users={users} speed={.3} slideSize={400} imgNum={0} direction={'ttb'} info={true} />
                    <VerticalUserCarousel key={'vertSlider2'} users={users} speed={0.9} slideSize={100} imgNum={1} direction={'ttb'} />
                    <VerticalUserCarousel key={'vertSlider3'} users={users} speed={.5} slideSize={200} imgNum={2} direction={'ttb'} />

                    <div className='overlay'>
                        <h1><span>Newly added users</span></h1>
                    </div>
                </motion.div>) : ''}
            </AnimatePresence>
        </motion.div >
    )
}

export default HomePage;