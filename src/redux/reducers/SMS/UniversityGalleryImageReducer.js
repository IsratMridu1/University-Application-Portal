const initialState = {
    universityGalleryImage: []
  };
  
  export const UniversityGalleryImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityGalleryImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          universityGalleryImage: action.payload
        };
  
      default:
        return state;
    }
  };