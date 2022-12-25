const initialState = {
    sightSettingCoverImage: []
  };
  export const SightSettingCoverIconReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreSiteSettingCoverIcon':
        return {
            sightSettingCoverImage: action.payload
        };
  
      default:
        return state;
    }
  }
  