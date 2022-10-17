import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import '../styles/LoginRegisterModal.scss'


const LoginRegisterModal = () => {

    const { showModal, formType } = useSelector(state => state.modalReducer)
    const { logged, userDataLoading } = useSelector(state => state.userData)
    const dispatch = useDispatch()

    const showForm = () => {
        if (showModal) {
            if (formType === 'loginForm') {
                return <LoginForm />
            } else if (formType === 'registerForm') {
                return <RegisterForm />
            }
        }
    }

    const modalRender = () => {
        if (userDataLoading) {

        } else {
            if (!logged) {
                return (<div className="login-register-modal">
                    <div>
                        {showForm()}
                    </div>
                    <div onClick={() => { dispatch({ type: 'hideModal' }) }} className="overlay"></div>

                </div>)
            }
        }
    }


    useEffect(() => {

    }, [logged, userDataLoading])


    return (
        <>
            {modalRender()}
        </>

    );
}

export default LoginRegisterModal;
