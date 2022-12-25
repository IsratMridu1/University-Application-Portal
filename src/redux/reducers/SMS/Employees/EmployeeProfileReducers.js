const initialState = {
    employeeProfile: {},
  };
  export const employeeProfileDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreEmployeeProfileData':
        return {
          employeeProfile: action.payload
        };
  
      default:
        return state;
    }
  }
  