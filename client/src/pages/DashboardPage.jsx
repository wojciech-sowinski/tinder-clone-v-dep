import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import OnboardInfo from "../components/OnboardInfo";
import LogInInfo from "../components/LoginInfo";
import SwipeContainer from '../components/SwipeContainer'
import ChatContainer from '../components/ChatContainer'
import MatchedUserPage from "../components/MatchedUserPage";
import { motion, AnimatePresence } from 'framer-motion'
import { pageContainerVariants } from '../animations/motion'
import DataLoader from '../components/DataLoader'


import '../styles/dashboardPage.scss'


const DashboardPage = () => {

    
    const dispatch = useDispatch()
    const { logged, userData } = useSelector(state => state.userData)
    const [activeMatch, setActiveMatch] = useState(false)
    const { usersCatalogLoading } = useSelector(state => state.users)

    const dashboardPageRender = (logged) => {

        const { firstName,
            birthDate,
            gender,
            interest,
            aboutMe,
            email, 
            imgUrl
        } = userData

        if (logged) {
            if (firstName &&
                birthDate &&
                gender &&
                interest &&
                aboutMe &&
                email && imgUrl.length) {
                return <>
                    {usersCatalogLoading && <DataLoader text={'Loading users'} />}
                    <AnimatePresence exitBeforeEnter>
                        {activeMatch ? <MatchedUserPage key={'matchuserpagekey'} activeMatch={activeMatch} /> : <SwipeContainer key={'swipecontainerkey'} activeMatch={activeMatch} />}
                    </AnimatePresence>
                    <ChatContainer activeMatch={activeMatch} setActiveMatch={setActiveMatch} />
                </>
            } else {
                return <OnboardInfo />
            }
        } else {
            return <LogInInfo />
        }
    }


    useEffect(() => {
       

        setActiveMatch(false)
        if (!logged) {
            dispatch({ type: 'showLoginForm' })
        }

    }, [])

    return (
        <motion.div className={`dashboard-page`}
            variants={pageContainerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={'dashboardpagekey'}
        >
            {dashboardPageRender(logged)}
        </motion.div>
    );
}

export default DashboardPage;