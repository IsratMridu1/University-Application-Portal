const initialState = {
    subDepartmentList: []
  };
  
  export const subDepartmentDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreSubDepartmentData':
        return {
            subDepartmentList : [action.payload],
  
        };
  
      default:
        return state;
    }
  }