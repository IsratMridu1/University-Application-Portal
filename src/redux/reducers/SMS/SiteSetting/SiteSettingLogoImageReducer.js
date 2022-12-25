const initialState = {
    sightSettinglogoImage: []
  };
  export const SightSettingLogoDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'StoreSiteSettingLogoImage':
        return {
            sightSettinglogoImage: action.payload
        };
  
      default:
        return state;
    }
  }
  