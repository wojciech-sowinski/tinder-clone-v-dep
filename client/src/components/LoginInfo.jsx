import LoginButton from "./LoginButton"
import '../styles/loginInfo.scss'

const LogInInfo = () => {
    return (
        <>
            <div className="login-info">
                <div><span>You must be logged in.</span></div>
                <div>
                    <LoginButton />
                </div>
            </div>
        </>
    )
}

export default LogInInfo