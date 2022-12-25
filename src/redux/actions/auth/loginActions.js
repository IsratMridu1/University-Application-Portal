import * as firebase from "firebase/app"
import { history } from "../../../history"
import "firebase/auth"
import "firebase/database"
import { store } from 'react-notifications-component';
import axios from "axios"
import { config } from "../../../authServices/firebase/firebaseConfig"
import { rootUrl } from "../../../views/ReusableFunction/Api/ApiFunc"

// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let firebaseAuth = firebase.auth()

// const initAuth0 = new auth0.WebAuth(configAuth)

export const submitLoginWithFireBase = (email, password, remember) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: "Admin"
          })
          let name = result.user.displayName
          if (user) {
            userEmail = user.email
            loggedIn = true
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn,
                loggedInWith: "firebase"
              }
            })
          }
          if (user && remember) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => {
                dispatch({
                  type: "LOGIN_WITH_EMAIL",
                  payload: {
                    email: userEmail,
                    name,
                    isSignedIn: loggedIn,
                    remember: true,
                    loggedInWith: "firebase"
                  }
                })
              })
          }
          history.push("/")
        })
      })
      .catch(error => {
      
      })
  }
}

export const loginWithFB = () => {
  return dispatch => {
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.setCustomParameters({
      display: "popup"
    })
    firebaseAuth
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken,
          // The signed-in user info.
          user = result.user.email
        dispatch({
          type: "LOGIN_WITH_FB",
          payload: {
            user,
            token,
            loggedInWith: "firebase"
          }
        })
        if (user) history.push("/")
      })
      .catch(error => {
       
      })
  }
}

export const loginWithTwitter = () => {
  return dispatch => {
    let provider = new firebase.auth.TwitterAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.user.displayName,
          photoUrl = result.user.photoURL
        dispatch({
          type: "LOGIN_WITH_TWITTER",
          payload: {
            user,
            name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
       
      })
  }
}

export const loginWithGoogle = () => {
  return dispatch => {
    let provider = new firebase.auth.GoogleAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.user.displayName,
          photoUrl = result.user.photoURL
        dispatch({
          type: "LOGIN_WITH_GOOGLE",
          payload: {
            email: user,
            name: name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
       
      })
  }
}

export const loginWithGithub = () => {
  return dispatch => {
    let provider = new firebase.auth.GithubAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.additionalUserInfo.username,
          photoUrl = result.user.photoURL

        dispatch({
          type: "LOGIN_WITH_GITHUB",
          payload: {
            user,
            name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
       
      })
  }
}

// export const loginWithJWT = user => {
//   return dispatch => {
//     axios
//       .post("/api/authenticate/login/user", {
//         email: user.email,
//         password: user.password
//       })
//       .then(response => {
//         var loggedInUser

//         if (response.data) {
//           loggedInUser = response.data.user

//           dispatch({
//             type: "LOGIN_WITH_JWT",
//             payload: { loggedInUser, loggedInWith: "jwt" }
//           })

//           history.push("/")
//         }
//       })
//       .catch(err =>)
//   }
// }

// export const loginWithJWT = user => {
//   return dispatch => {
//     var loggedInUser = {id: 0, email: '', name: '', image: 'gbhgyhgv', loggedInWith: 'jwt'}
//     axios
//       .post(`${rootUrl}/Account/Login`, {
//         Email: user.email,
//         Password: user.password
//       })
//       .then(response => {
//         if (response.data) {
//           if(response.data.isSuccess == true){
//             localStorage.setItem('token',response.data.message);
//             const AuthStr = 'Bearer ' + response.data.message;
//             history.push("/")
//             window.location.reload();
//             // axios.get(`${rootUrl}/Account/GetCurrentUser`,{ 'headers': { 'Authorization': AuthStr } })
//             // .then(res => {
//             //  
//             //   loggedInUser.name = res.data.fullName;
//             //   loggedInUser.id = res.data.id;
//             //   loggedInUser.email = res.data.email;
//             //   // loggedInUser = JSON.stringify(res.data);
//             //   dispatch({
//             //             type: "LOGIN_WITH_JWT",
//             //             payload: { loggedInUser, loggedInWith: "jwt" }
//             //           })
//             // })
             


//           }else{
//             // alert('email not valid')
//           }

          
//         }
//       })
//       .catch(err => )
//   }
// }



// export const logoutWithJWT = () => {
//   localStorage.removeItem('token');
//   history.push("/pages/login");
//   window.location.reload();
//   return dispatch => {
//     dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
//   }
// }

export const logoutWithFirebase = user => {
  return dispatch => {
    dispatch({ type: "LOGOUT_WITH_FIREBASE", payload: {} })
    history.push("/pages/login")
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
