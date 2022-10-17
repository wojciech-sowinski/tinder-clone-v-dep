import { useSelector, useDispatch } from 'react-redux';
import '../styles/loginForm.scss'
import { logOut } from '../actions/userActions';

const LoginButton = () => {

    const dispatch = useDispatch()
    const { logged } = useSelector(state => state.userData)

    const onClickHandle = (e) => {
        if (!logged) {
            dispatch({ type: 'showLoginForm' })
        } else {
            dispatch(logOut())
        }
    }

    return (
        <>
            <div className="input-div">
                <input
                    type="submit"
                    value={logged ? "Log Out" : "Log In"}
                    name="login-submit"
                    id="login-submit-input"
                    onClick={onClickHandle}
                    className="login-button" />
            </div>
        </>);
}

export default LoginButton;