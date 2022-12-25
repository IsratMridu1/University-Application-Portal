const initialState = {
    departmentList: [],
    department: {}
  };

  export const departmentDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GetDepartments':
        return {
          departmentList: [action.payload], 
        };
      case 'CreateDepartment':
        return state
      case 'UpdateDepartment':
        return state
      case 'DeleteDepartment':
        return state
      default:
        return state;
    }
  };