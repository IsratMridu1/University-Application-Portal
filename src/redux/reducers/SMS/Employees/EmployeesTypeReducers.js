const initialState = {
  employeeType: [],
};
export const employeeTypeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'StoreEmployeeTypeData':
      return {
        employeeType: [action.payload],
      };

    default:
      return state;
  }
}
