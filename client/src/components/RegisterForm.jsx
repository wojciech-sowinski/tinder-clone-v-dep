import { useState } from 'react';
import '../styles/registerForm.scss'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/userActions.js'
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { divFlipHorizontalWithResize } from '../animations/motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faAt, faKey } from '@fortawesome/free-solid-svg-icons'


const RegisterForm = () => {

    const initialRegisterFormState = {
        email: "",
        password: "",
        passwordConfirm: "",
        resultInfo: ''
    }

    const [registerFormData, setRegisterFormData] = useState(initialRegisterFormState)
    const { userData, resultInfo } = useSelector(state => state.userData)
    const dispatch = useDispatch()

    const inputLoginHandle = (e) => {
        setRegisterFormData(prev => {
            return {
                ...prev,
                email: e.target.value
            }
        })
    }
    const inputPasswordHandle = (e) => {
        setRegisterFormData(prev => {
            return {
                ...prev,
                password: e.target.value
            }
        })
    }
    const inputPasswordConfirmHandle = (e) => {
        if (e.target.value !== registerFormData.password) {
            setRegisterFormData(prev => {
                return {
                    ...prev,
                    info: 'Password and confirm is not the same'
                }
            })
        } else {
            setRegisterFormData(prev => {
                return {
                    ...prev,
                    info: ''
                }
            })
        }
        setRegisterFormData(prev => {
            return {
                ...prev,
                passwordConfirm: e.target.value
            }
        })
    }

    const handleRegisterSubmit = (e) => {

        e.preventDefault()
        const { email, password, passwordConfirm } = registerFormData

        if (password !== passwordConfirm) {
            dispatch({ type: 'register', payload: 'Pasword and password confirmation must be the same.' })
            setTimeout(() => {
                dispatch({ type: 'register', payload: '' })

            }, 2000);
        } else {
            dispatch(register({ email, password, passwordConfirm }))
        }
    }

    useEffect(() => {

    }, [userData, resultInfo])

    return (
        <>
            <form onSubmit={handleRegisterSubmit} id="register-form">
                <div className='close-button' onClick={() => { dispatch({ type: 'hideModal' }) }}><FontAwesomeIcon icon={faCircleXmark} /></div>
                <div>
                    <h2>Create New Account</h2>
                </div>
                <div className="input-div">
                    <input
                        type="email"
                        required
                        name="register-email"
                        id="register-email-input"
                        value={registerFormData.email}
                        onChange={inputLoginHandle} />
                    <span><FontAwesomeIcon icon={faAt} /> Email</span>
                </div>
                <div className="input-div">
                    <input
                        type="password"
                        name="register-password"
                        id="register-password-input"
                        required
                        value={registerFormData.password}
                        onChange={inputPasswordHandle} />
                    <span><FontAwesomeIcon icon={faKey} /> Password</span>
                </div>
                <div className="input-div">
                    <input
                        type="password"
                        name="register-password-confirm"
                        id="register-password-confirm-input"
                        required
                        value={registerFormData.passwordConfirm}
                        onChange={inputPasswordConfirmHandle} />
                    <span><FontAwesomeIcon icon={faKey} /> Confirm Password</span>
                </div>
                <div className="input-div">
                    <input
                        type="submit"
                        value="Sign In"
                        name="register-submit"
                        id="register-submit-input"
                        className='sign-in-button' />
                </div>
                <div>
                    <AnimatePresence>
                        {resultInfo ? (<motion.p
                            className='register-info'
                            key={"loadericonskey"}
                            variants={divFlipHorizontalWithResize}
                            initial='hidden'
                            animate='visible'
                            exit='exit'>
                            {resultInfo}
                        </motion.p>) : ''}
                    </AnimatePresence>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;