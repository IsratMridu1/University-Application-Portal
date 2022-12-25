const initialState = {
    universityCoverImage: []
  };
  
  export const UniversityCoverImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityCoverImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityCoverImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  