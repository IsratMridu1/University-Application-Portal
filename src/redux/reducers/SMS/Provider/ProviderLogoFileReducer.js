const initialState = {
    ProviderLogoFile: {}
  };
  
  export const GeneralProviderlogoFile = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreProviderDataLogoFile':
        return {
          // ...state,
          // commentData: [...state.commentData,action.payload],
          ProviderLogoFile: action.payload
  
        };
  
      default:
        return state;
    }
  };
  
  