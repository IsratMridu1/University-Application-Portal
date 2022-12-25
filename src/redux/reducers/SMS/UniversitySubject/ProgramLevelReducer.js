const initialState = {
    programLevelList: []
  };

  export const programLevelDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreProgramLevelData':
        return {
            programLevelList: [action.payload], 
        };
  
      default:
        return state;
    }
  };