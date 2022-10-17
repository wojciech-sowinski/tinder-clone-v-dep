import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import '../styles/matchedUserPage.scss'
import { motion } from 'framer-motion'
import { divContainerVariants } from '../animations/motion'
import SliderWithThumb from './SliderWithThumb'

const MatchedUserPage = ({ activeMatch }) => {

    const { users } = useSelector(state => state.users)
    const [{ aboutMe, birthDate, firstName, gender, interest, imgUrl }] = users.filter(user => user._id === activeMatch)


    const characterAge = (birthDate) => {
        return (new Date().getFullYear()) - (new Date(birthDate).getFullYear())
    }

    const genderSign = (gender) => {
        switch (gender) {
            case 'Female':
                return <FontAwesomeIcon icon={faVenus} />
            case 'Male':
                return <FontAwesomeIcon icon={faMars} />
            case 'Everyone':
                return <FontAwesomeIcon icon={faVenusMars} />
            default:
                break;
        }
    }


    return (
        <motion.div className="matched-user-page"
            key={"matched-user-page-key"}
            variants={divContainerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <div className='match-user-imgs'>
                <SliderWithThumb userImages={imgUrl} />
            </div>
            <div className='match-user-info'>
                <h2 > {firstName} </h2>
                <div className='match-user-info-bar'>
                    <span>Age: <span className='match-user-age-span'>{` ${characterAge(birthDate)}`}</span></span>
                    <span>
                        Gender: {genderSign(gender)}
                    </span>
                    <span>
                        Interest: {genderSign(interest)}
                    </span>
                </div>
                <div className='about-me-container'>
                    <h4>
                        About me:
                    </h4>
                    <p>{aboutMe}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default MatchedUserPage;