const dataLoaderReducer = (state=false,action) => {    
    switch (action.type) {
        case 'loaderON':            
            return true;
        case 'loaderOFF':
            return false
        default:
            return state;
    }
}
 
export default dataLoaderReducer;