const initialState = {
    userRole: "admin" 
  };
  
  export const login = (state = initialState, action) => {
    
    switch (action.type) {
        case "LOGIN_WITH_JWT": {
           
            return { ...state, values: action.payload }
          }
      default:
        return state;
    }
  };
  
  export const logout = (state = initialState, action) => {
   
    switch (action.type) {
        case "LOGOUT_WITH_JWT": {
           
            return { ...state, values: action.payload }
          }
      default:
        return state;
    }
  };
  