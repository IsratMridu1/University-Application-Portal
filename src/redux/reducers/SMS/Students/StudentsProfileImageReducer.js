const initialState = {
    studentImage: []
  };
  
  export const StudentProfileImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreStudentProfileImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          studentImage: action.payload
        };
  
      default:
        return state;
    }
  };
  