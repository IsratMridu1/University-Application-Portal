export const studentLoginJwtAction = (data) => {

    return {
      type: 'LOGIN_WITH_JWT',
      payload: data
    }
  }
  
export const studentLogOutJwtAction = (data) => {

    return {
      type: 'LOGOUT_WITH_JWT',
      payload: data
    }
  }
  