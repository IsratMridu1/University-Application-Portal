const initialState = {
  commentData: [],
  postData: [],
  todoData: [],
};

export const commentDataReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case 'StoreCommentData':
      return {
        // ...state,
        // commentData: [...state.commentData,action.payload],
        commentData: [action.payload],

      };

    default:
      return state;
  }
};

export const postDataReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case 'StorePostData':
      return {
        // ...state,
        postData: [...state.postData,action.payload],
      };

    default:
      return state;
  }
};


export const todoDataReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'StoreTodoData':
      return {
        // ...state,
        todoData: [...state.todoData,action.payload],
      };

    default:
      return state;
  }
};

