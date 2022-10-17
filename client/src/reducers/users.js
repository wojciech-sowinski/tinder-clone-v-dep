const initialState = {
    usersCatalogLoading:false,
    users:[]
}

const users = (state = initialState, action) => {    
    switch (action.type) {
        case 'fetchUsersCatalog':
            return {...state,...action.payload};
        default:
            return state;
    }
}

export default users;