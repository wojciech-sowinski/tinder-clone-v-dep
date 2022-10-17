import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LogInInfo from "../components/LoginInfo";
import UploadImg from "../components/UploadImg";
import '../styles/onBoardPage.scss'
import { userDataUpdate } from "../actions/userActions";
import { motion } from 'framer-motion'
import { pageContainerVariants } from '../animations/motion'
import SliderWithThumb from "../components/SliderWithThumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const OnBoardPage = () => {

    const { userData, logged, userDataLoading } = useSelector(state => state.userData)
    

    const { firstName,
        birthDate,
        gender,
        interest,
        aboutMe,
        email
    } = userData

    const dispatch = useDispatch()

    const initialFormData = {
        firstName: '',
        birthDate: '',
        gender: '',
        interest: '',
        aboutMe: '',
        email: '',

    }
    const [formData, setFormData] = useState(initialFormData)
    const [updateResult, setUpdateResult] = useState('Submit Changes')


    const handleFirstNameChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                firstName: e.target.value
            }
        })
    }
    const handleEmailNameChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            email: e.target.value
        }))
    }
    const handleBirthDateChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                birthDate: e.target.value
            }
        })
    }
    const handleGenderChoose = (e) => {
        e.preventDefault()
        switch (e.currentTarget.innerText) {
            case "Male":
                setFormData((prev) => {
                    return {
                        ...prev,
                        gender: "Male"
                    }
                })
                break;
            case "Female":

                setFormData((prev) => {
                    return {
                        ...prev,
                        gender: "Female"
                    }
                })
                break;
            default:
                break;
        }
    }
    const handleInterestChoose = (e) => {
        e.preventDefault()
        switch (e.currentTarget.innerText) {
            case "Male":
                setFormData((prev) => {
                    return {
                        ...prev,
                        interest: "Male"
                    }
                })
                break;
            case "Female":
                setFormData((prev) => {
                    return {
                        ...prev,
                        interest: "Female"
                    }
                })
                break;
            case "Everyone":
                setFormData((prev) => {
                    return {
                        ...prev,
                        interest: "Everyone"
                    }
                })
                break;
            default:
                break;
        }
    }
    const handleAboutMeChange = (e) => {
        if (e.target.value.length <= 200) {
            setFormData((prev) => {
                return {
                    ...prev,
                    aboutMe: e.target.value
                }
            })
        }
    }

    const submitHandle = (e) => {
        e.preventDefault()
        const { firstName, birthDate, gender, interest, aboutMe, email } = formData
        dispatch(userDataUpdate({ firstName, birthDate, gender, interest, aboutMe, email }))
        setUpdateResult('Changes Saved')
        setTimeout(() => {
            setUpdateResult('Submit Changes')
        }, 3000);
        
    }



    const UserProfileForm = () => {
        return (
            <>
                <h1>Your Profile</h1>
                <form onSubmit={submitHandle}>
                    <div className="first-col">
                        <div>
                            <label>First Name</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleFirstNameChange} />
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleEmailNameChange} />
                        </div>
                        <div>
                            <label htmlFor="">Birthday Date</label>
                        </div>
                        <div>
                            <input type="date"
                                name="birthDate"
                                required
                                value={formData.birthDate.slice(0, 10)}
                                onChange={handleBirthDateChange} />
                        </div>
                        <div>
                            <label htmlFor="">Gender</label>
                        </div>
                        <div>
                            <button
                                name="genderChoiceMale"
                                className={formData.gender === 'Male' ? 'active' : ''}
                                onClick={handleGenderChoose}>Male</button>
                            <button
                                name="genderChoiceFemale"
                                className={formData.gender === 'Female' ? 'active' : ''}
                                onClick={handleGenderChoose}>Female</button>
                        </div>
                        <div>
                            <label>Show Me</label>
                        </div>
                        <div>
                            <button
                                name="interestChoiceMale"
                                onClick={handleInterestChoose}
                                className={formData.interest === 'Male' ? 'active' : ''}
                            >Male</button>
                            <button
                                name="interestChoiceFemale"
                                onClick={handleInterestChoose}
                                className={formData.interest === 'Female' ? 'active' : ''}>Female</button>
                            <button
                                name="interestChoiceEveryone"
                                onClick={handleInterestChoose}
                                className={formData.interest === 'Everyone' ? 'active' : ''}>Everyone</button>
                        </div>
                        <div>
                            <label>About Me</label>
                        </div>
                        <div>
                            <textarea placeholder="Maximum 200 characters" cols="30" rows="10"
                                onChange={handleAboutMeChange}
                                name="aboutMe"
                                value={formData.aboutMe}>
                            </textarea>
                            <p className="character-left-info">  {formData.aboutMe.length ? `(${200 - formData.aboutMe.length} characters left)` : ""} </p>
                        </div>
                    </div>
                    <div className="second-col">
                        <div>
                            <label>Profile Photos</label>
                        </div>
                        <div>
                            <span>
                                <FontAwesomeIcon icon={faStar} style={{ color: 'rgb(255, 174, 0)' }} /> The first photo added will be the main photo.
                            </span>
                        </div>
                        <div>

                            {<UploadImg />}
                        </div>
                        <div>
                            <SliderWithThumb userImages={userData.imgUrl} editable={true} />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button className={`submit-button ${updateResult==='Changes Saved' ? 'green-button' : ''}`} type="submit">{updateResult}</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }



    useEffect(() => {

        if (!logged && !userDataLoading) {
            dispatch({ type: 'showLoginForm' })
        } else {
            setFormData({ ...initialFormData, ...userData })
        }

    }, [logged, firstName, birthDate, gender, interest, aboutMe, email])


    return (
        <>
            <motion.div className="on-board-page"
                variants={pageContainerVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                {!logged ? <LogInInfo /> : UserProfileForm()}
            </motion.div>
        </>
    );
}

export default OnBoardPage;