const initialState = {
    permissions: [],
  };
export const permissionsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'StorePermissionsData':
          return {
            permissions: [action.payload],
          };

        default:
          return state;
      }
}
