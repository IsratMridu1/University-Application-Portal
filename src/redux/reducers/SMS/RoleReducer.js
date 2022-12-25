const initialState = {
  roles: []
};

export const roleDataReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'StoreRoleData':
      return {
        // ...state,
        // commentData: [...state.commentData,action.payload],
        roles: [action.payload],

      };

    default:
      return state;
  }
};


