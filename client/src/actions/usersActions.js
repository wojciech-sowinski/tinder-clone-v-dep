import axios
from "axios";

import config from "../config";


export const fetchUsersCatalog = () => async (dispatch)=>{
  


    dispatch({type:'fetchUsersCatalog',payload:{usersCatalogLoading:true}})
    
    try {
        const response = await axios.get(config.serverUrl + 'users')
        
        if (response.status == 200) {
           
                
            dispatch({type:'fetchUsersCatalog',payload:{users:response.data,usersCatalogLoading:false}})
            
         
            
           
            }
    } catch (error) {
        console.log(error);
    }

}

