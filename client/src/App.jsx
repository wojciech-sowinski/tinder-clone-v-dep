import './styles/app.scss'
import '../src/styles/buttons.scss'
import {
  BrowserRouter as Router
} from "react-router-dom";
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import LoginRegisterModal from './components/LoginRegisterModal';
import {
  useEffect,
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { fetchMessages, fetchNewMessageCount } from './actions/messagesActions'
import { fetchUsersCatalog } from './actions/usersActions';
import { isLogged } from './actions/userActions'


function App() {

  const {
    showModal,
    formType
  } = useSelector(state => state.modalReducer)
  const {
    logged
  } = useSelector(state => state.userData)
  const newMessages = useSelector(state => state.newMessages)
  const { messages } = useSelector(state => state.messages)
  const dispatch = useDispatch()



  useEffect(() => {

    dispatch(isLogged())
    dispatch(fetchUsersCatalog())
    dispatch(fetchNewMessageCount())
    dispatch(fetchMessages())
    const appInterval = setInterval(() => {
      if (logged) {

        dispatch(fetchNewMessageCount())

      }
    }, 3000);

    return () => {
      clearInterval(appInterval)
    }
  }, [logged])

  // basename={'/matchymatchy/'}
  return (
    <Router >
      <div className="App" >
        {
          showModal && < LoginRegisterModal />
        } <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;