const initialState = {
    managerImage: []
  };
  
  export const ManagerImageReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreManagerImageData':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          managerImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  