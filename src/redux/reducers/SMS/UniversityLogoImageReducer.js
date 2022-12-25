const initialState = {
    universityLogoImage: []
  };
  
  export const UniversityLogoImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityLogoImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityLogoImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  