const initialState = {
    universityStates: []
  };
  
  export const universityStateDataReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityStateData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityStates: [action.payload],
        };
  
      default:
        return state;
    }
  };
  
  
  