const initialState = {
    proofOfRightToWorkFile: [],
    proofOfAddress: [],
    idOrPassport: [],
    profileImage: [],
    coverImage: []
  };
  
  export const ConsultantFileReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'ProofOfRightToWorkData':
        return {
          ...state,
          // commentData: [...state.commentData,action.payload],
          ProofOfRightToWorkFile: action.payload
        };
  
      case 'ProofOfAddress':
        return {
          ...state,
          // commentData: [...state.commentData,action.payload],
          proofOfAddress: action.payload
        };

      case 'IdOrPassport':
        return {
          ...state,
          // commentData: [...state.commentData,action.payload],
          idOrPassport: action.payload
        };
  
      case 'ProfileImage':
        return {
          ...state,
          // commentData: [...state.commentData,action.payload],
          profileImage: action.payload
        };
  
      case 'CoverImage':
        return {
          ...state,
          // commentData: [...state.commentData,action.payload],
          coverImage: action.payload
        };
  
      default:
        return state;
    }
  };
  
  