const initialState = {
    employeeCoverImage: []
  };
  export const employeeCoverDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreEmployeeCoverData':
        return {
            employeeCoverImage: action.payload
        };
  
      default:
        return state;
    }
  }
  