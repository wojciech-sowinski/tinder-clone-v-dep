import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { matchUpdate,forgott } from '../actions/userActions'
import { sendMessage } from '../actions/messagesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles, faMars, faVenus, faVenusMars, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { divContainerVariants, divContainerFade } from '../animations/motion'




const SwipeContainer = ({ activeMatch, setActiveMatch }) => {

  const { users, usersCatalogLoading } = useSelector(state => state.users)
  const { messages } = useSelector(state => state.messages)
  const [characters, setCharacters] = useState(users)
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userData)
  const [lastDirection, setLastDirection] = useState()




  const addMatch = (id) => {

    const userMatches = [...userData.matches]

    if (userMatches.findIndex((match) => match === id) > -1) {
      
    } else {
      dispatch(matchUpdate(userData._id, id))
      dispatch(sendMessage({
        from: userData._id,
        to: id,
        body: "Hey, I match you. Let's talk :)"
    }))
      
    }
  }

  const sortCharacters = (data) => {
 

    const sortedUsers = data.filter(character => {
      // console.log(!userData.matches.findIndex(match=>match!=character._id),character.firstName);
// console.log(userData);



      if ((character.gender === userData.interest || userData.interest == 'Everyone') && (character.interest === userData.gender || character.interest == 'Everyone') && userData._id !== character._id && userData.matches?.findIndex(match=>match===character._id)===-1 && userData.forgotten?.findIndex(match=>match===character._id)===-1) {
        return character
      }
    })
    return sortedUsers
  }

  const genderSign = (gender) => {

    switch (gender) {
      case 'Female':
        return <FontAwesomeIcon icon={faVenus} />
      case 'Male':
        return <FontAwesomeIcon icon={faMars} />
      case 'Both':
        return <FontAwesomeIcon icon={faVenusMars} />
      default:
        break;
    }
  }

  const swiped = (direction, nameToDelete) => {
    
    setLastDirection(direction)
    if (direction === 'right') {
      addMatch(nameToDelete)
    }else if(direction ==='left'){
     
      dispatch(forgott(nameToDelete))
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const characterAge = (birthDate) => {
    return (new Date().getFullYear()) - (new Date(birthDate).getFullYear())
  }

  useEffect(() => {
    setCharacters(users)
  }, [users, userData])

  return (
    <motion.div className="swipe-container"
      variants={divContainerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      key={'dashboardpagekey'}>
      <div className='swipe-info-left'>
        <div><span>Swipe left to forget</span></div>
        <div>{<FontAwesomeIcon icon={faAnglesLeft} />}</div>
      </div>
      <div className='cardContainer'>
        {sortCharacters(characters).map((character) =>
          <TinderCard
            key={character._id}
            className='swipe'
            onSwipe={(dir) => swiped(dir, character._id)}
            onCardLeftScreen={() => outOfFrame(character.firstName)}
            preventSwipe={['up', 'down']}>
            <div
              style={{ backgroundImage: 'url(' + character.imgUrl[0] + ')' }} className='card'>
            </div>
            <div className='tinder-card-character-info'>
              <div className='card-header'>
                <span className='character-first-name'>{character.firstName} {genderSign(character.gender)}</span> <span className='character-age'><FontAwesomeIcon icon={faCakeCandles} />{` ${characterAge(character.birthDate)}`}</span>
              </div>
              <div className='about-me'>
                <h4>About Me</h4>
                <p className='info-text'>{character.aboutMe}</p>
              </div>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='swipe-info-right'>
        <div><div>{<FontAwesomeIcon icon={faAnglesRight} />}</div></div>
        <div><span>Swipe right to match</span></div>
      </div>
    </motion.div>
  );
}

export default SwipeContainer;