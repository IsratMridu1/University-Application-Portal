const initialState = {
    universityCountries: []
  };
  
  export const universityCountryDataReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityCountryData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityCountries: [action.payload],
  
        };
  
      default:
        return state;
    }
  };
  
  
  