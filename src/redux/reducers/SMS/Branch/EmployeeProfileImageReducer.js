const initialState = {
    employeeProfileImage: []
  };
  
  export const BranchEmployeeProfileImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreEmployeeProfileImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          employeeProfileImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  