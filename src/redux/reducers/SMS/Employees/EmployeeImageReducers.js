const initialState = {
    employeeProfileImage: []
  };
  export const employeeProfileImageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreEmployeeImageData':
        return {
          employeeProfileImage: action.payload
        };
  
      default:
        return state;
    }
  }
  