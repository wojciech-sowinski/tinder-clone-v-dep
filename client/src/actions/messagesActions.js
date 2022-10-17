import axios
from "axios";
import {
    useDispatch,useSelector
} from "react-redux";
import config from "../config";

export const sendMessage = (msg) => async (dispatch) => {

    await axios.post(config.serverUrl + 'msg', msg, {
            withCredentials: true
        })
        .then(resolve => {
            if (resolve.status == 200) {

                dispatch({
                    type: 'sendMessage',
                    payload: resolve.data
                })
            }
        })

}


export const fetchMessages = () => async (dispatch) => {
    
    dispatch({
        type: 'fetchMessages',
        payload: {
            loading: true
        }
    })

    const resolve = await axios.get(config.serverUrl + 'msgs', {
        withCredentials: true
    })

    if (resolve.status == 200) {

            dispatch({
                type: 'fetchMessages',
                payload: {
                    loading: false,
                    messages: resolve.data
                }
            })
        
    }
}

let initialCounter = 0

export const fetchNewMessageCount = () => async (dispatch) => {


    try {
        const resolve = await axios.get(config.serverUrl + 'newmsgs', {
            withCredentials: true
        })
        if (resolve.status == 200) {
            dispatch({
                type: 'fetchNewMessageCount',
                payload: resolve.data
            })
            if(resolve.data!=initialCounter){
               
                dispatch(fetchMessages())
                initialCounter=resolve.data
            }
            
        } else {
            dispatch({
                type: 'fetchNewMessageCount',
                payload: 0
            })
        }
    } catch (error) {
        console.log(error);
    }

}


export const msgDisplayed = (from, to) => async (dispatch) => {
  
    try {
        const resolve = axios.post(config.serverUrl + 'msgdisplayed', {
            from,
            to
        }, {
            withCredentials: true
        })
       
    } catch (error) {
        console.log(error);
    }
}
