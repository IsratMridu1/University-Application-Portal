const initialState = {
  parentMenus: []
};

export const parentMenuItemReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'StoreParentMenuItem':
      return {
        // ...state,
        // commentData: [...state.commentData,action.payload],
        parentMenus : [action.payload],

      };

    default:
      return state;
  }
};


