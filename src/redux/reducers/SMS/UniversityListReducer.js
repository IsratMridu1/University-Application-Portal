const initialState = {
    universityList: []
  };
  
  export const universityListReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case 'StoreUniversityListData':
        return {
          universityList: [action.payload],
        };
  
      default:
        return state;
    }
  };
  