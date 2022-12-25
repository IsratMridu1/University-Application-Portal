import React, { useEffect } from "react"
import { Navbar } from "reactstrap"
import { connect, useDispatch } from "react-redux"
import classnames from "classnames"
import axios from "axios"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import {
  // logoutWithJWT,
  logoutWithFirebase
} from "../../../redux/actions/auth/loginActions"
import NavbarUser from "./NavbarUser"
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import SidebarHeader from "../menu/vertical-menu/SidebarHeader"
import { rootUrl } from "../../../views/ReusableFunction/Api/ApiFunc"
import { studentLoginJwtAction } from "../../../redux/actions/SMS/AuthAction/AuthAction"

const UserName = props => {
  const dispatch = useDispatch();

 var loggedInUser = {id: 0, email: '', name: '', image: 'gbhgyhgv', loggedInWith: 'jwt'}
 const token = localStorage.getItem('token');
 const AuthStr = 'Bearer ' + token;

  // useEffect(()=>{
  //   axios.get(`${rootUrl}/Account/GetCurrentUser`,{ 'headers': { 'Authorization': AuthStr } })
  //           .then(res => {
            
  //             loggedInUser.name = res.data.fullName;
  //             loggedInUser.id = res.data.id;
  //             loggedInUser.email = res.data.email;
  //             // loggedInUser = JSON.stringify(res.data);
  //             // dispatch({
  //             //           type: "LOGIN_WITH_JWT",
  //             //           payload: { loggedInUser, loggedInWith: "jwt" }
  //             //         })

  //             dispatch(studentLoginJwtAction(loggedInUser));

  //           })
  // },[])


  let username = ""
  const userObj = props.user.login.values;

  

  if (props.userdata !== undefined) {
    username = props.userdata.name
  } else if (props.user.login.values !== undefined) {
    username = props.user.login.values.name
    if (
      props.user.login.values.loggedInWith !== undefined &&
      props.user.login.values.loggedInWith === "jwt"
    ) {
      username = props.user.login.values.name
    }
  } else {
    username = "John Doe"
  }

  return username
}
const ThemeNavbar = props => {
  const { user } = useAuth0() 
  let {
    toggleSidebarMenu,
    toggle,
    color,
    sidebarVisibility,
    activeTheme,
    collapsed,
    activePath,
    sidebarState,
    menuShadow
  } = props;

  return (
    <React.Fragment>
      <div className="content-overlay" />
      {/* <div className="header-navbar-shadow" /> */}
     
      <Navbar
        className={classnames(
          "header-navbar uapp-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow", "navbar-light", "primary", "floating-nav", "scrolling"
         
        )}
      >
          
     
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
              <SidebarHeader
                  toggleSidebarMenu={toggleSidebarMenu}
                  toggle={toggle}
                  sidebarBgColor={color}
                  sidebarVisibility={sidebarVisibility}
                  activeTheme={activeTheme}
                  collapsed={collapsed}
                  menuShadow={menuShadow}
                  activePath={activePath}
                  sidebarState={sidebarState}
                />
              </div>
          
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={<UserName userdata={user} {...props} />}
                userImg={
                  props.user.login.values !== undefined &&
                  props.user.login.values.loggedInWith !== "jwt" &&
                  props.user.login.values.photoUrl
                    ? props.user.login.values.photoUrl 
                    : user !== undefined && user.picture ? user.picture
                    : userImg
                }
                loggedInWith={
                  props.user !== undefined &&
                  props.user.login.values !== undefined
                    ? props.user.login.values.loggedInWith
                    : null
                }
                // logoutWithJWT={props.logoutWithJWT}
                logoutWithFirebase={props.logoutWithFirebase}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {
  // logoutWithJWT,
  logoutWithFirebase,
  useAuth0
})(ThemeNavbar)
