const initialState = {
    universityProviders: {}
  };
  
  export const universityProviderDataReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityProviderData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityProviders: action.payload
  
        };
  
      default:
        return state;
    }
  };
  
  
  