const initialState = {
    universityTypes: []
  };
  
  export const universityTypeDataReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'StoreUniversitytypeData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityTypes: [action.payload],
  
        };
  
      default:
        return state;
    }
  };
  
  
  