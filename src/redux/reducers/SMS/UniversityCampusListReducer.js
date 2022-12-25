const initialState = {
    universityCampusList: []
  };
  
  export const universityCampusListReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityCampusListData':
        return {
          universityCampusList: [action.payload],
        };
  
      default:
        return state;
    }
  };