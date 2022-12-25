// StoreEmployeeCoverImageData

const initialState = {
    employeeCoverImage: []
  };
  
  export const BranchEmployeeCoverImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreEmployeeCoverImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          employeeCoverImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  