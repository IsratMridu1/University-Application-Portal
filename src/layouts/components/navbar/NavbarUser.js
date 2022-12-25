import React, { useEffect, useRef, useState } from "react"
import {

  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import axios from "axios"
import * as Icon from "react-feather"

import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import { history } from "../../../history"
import { studentLogOutJwtAction } from "../../../redux/actions/SMS/AuthAction/AuthAction"
import { useDispatch } from "react-redux"
import { rootUrl } from "../../../constants/constants"
import { userTypes } from "../../../constants/userTypeConstant"
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Link } from "react-router-dom"

const handleNavigation = (e, path) => {
  e.preventDefault()
  history.push(path)
}

const userInfo = JSON.parse(localStorage.getItem('current_user'));
const AuthStr = localStorage.getItem("token");



const UserDropdown = props => {
  const dispatch = useDispatch();
  const { logout, isAuthenticated } = useAuth0()


  const redirectToProfile = () => {

    if (userInfo?.userTypeId == userTypes?.Admin ||
      userInfo?.userTypeId == userTypes?.AccountManager ||
      userInfo?.userTypeId == userTypes?.Editor ||
      userInfo?.userTypeId == userTypes?.AccountOfficer ||
      userInfo?.userTypeId == userTypes?.ComplianceManager ||
      userInfo?.userTypeId == userTypes?.FinanceManager) {
      history.push(`/employeeProfile/${userInfo?.referenceId}`);
    }
    else if (userInfo?.userTypeId == userTypes?.AdmissionManager) {
      history.push(`/admissionManagerProfile/${userInfo?.referenceId}`);
    }
    else if (userInfo?.userTypeId == userTypes?.ProviderAdmin) {
      history.push(`/providerAdminProfile/${userInfo?.referenceId}`);
    }
    else if (userInfo?.userTypeId == userTypes?.BranchManager) {
      history.push(`/providerAdminProfile/${userInfo?.referenceId}`);//TODO
    }
    else if (userInfo?.userTypeId == userTypes?.Consultant) {
      history.push(`/consultantProfile/${userInfo?.referenceId}`);
    }
    else if (userInfo?.userTypeId == userTypes?.Student) {
      history.push(`/studentProfile/${userInfo?.referenceId}`);//TODO
    }
    else {
      history.push('/');
    }
  }

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };
 

  const handleLogOut = (e) => {
    e.preventDefault();

    // return dispatch => {
    //   dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    // }
    const AuthStr = localStorage.getItem('token');
    axios.get(`${rootUrl}Account/LogOut`, {
      method: 'GET',
      headers: {
        'authorization': AuthStr
      }
    })
      .then(res => {
        
        // localStorage.removeItem('token');
        history.push("/");
        window.localStorage.clear();
        window.location.reload();

      })
    dispatch(studentLogOutJwtAction({}))
  }
  return (
    <DropdownMenu right>
      {/* <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/pages/profile")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem> */}
      {/* <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/email/inbox")}
      >
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">My Inbox</span>
      </DropdownItem> */}
      {/* <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/todo/all")}
      >
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem> */}
      {/* <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/chat")}
      >
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Chats</span>
      </DropdownItem> */}
      {/* <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, "/ecommerce/wishlist")}>
        <Icon.Heart size={14} className="mr-50" />
        <span className="align-middle">WishList</span>
      </DropdownItem> */}


      <DropdownItem
        tag="a"
        // href="#"
        onClick={redirectToProfile}


      >

        <Icon.User size={14} className="mr-50" />
        <span className="align-middle"  >Profile</span>
      </DropdownItem>

      <DropdownItem
        tag="a"
        href="#"

      >

        <Icon.Settings size={14} className="mr-50" />
        <span className="align-middle">Settings</span>
      </DropdownItem>

      <DropdownItem
        tag="a"
        href="#"

      >

        <Icon.LogIn size={14} className="mr-50" />
        <span className="align-middle">Login History</span>
      </DropdownItem>

      <DropdownItem divider />
      <DropdownItem tag="a"

        onClick={e => {
          handleLogOut(e)
          // return props.logoutWithJWT()
          // if (isAuthenticated) {
          //   return logout({
          //     returnTo: window.location.origin + process.env.REACT_APP_PUBLIC_PATH
          //   })
          // } else {
          //   const provider = props.loggedInWith
          //   if (provider !== null) {
          //     if (provider === "jwt") {
          //       return props.logoutWithJWT()
          //     }
          //     if (provider === "firebase") {
          //       return props.logoutWithFirebase()
          //     }
          //   } else {
          //     history.push("/pages/login")
          //   }
          // }

        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>


    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    suggestions: [],
    connection: [],
    chat: '',
    notificationCount: 0,
    notificationData: []
  }

  // componentDidMount() {
  //   axios.get("/api/main-search/data").then(({ data }) => {
  //     this.setState({ suggestions: data.searchResult })
  //   })
  // }


  //  Code testing start

  //  const [ connection, setConnection ] = useState(null);
  //  const [ chat, setChat ] = useState('');
  //  const latestChat = useRef(null);
 
  //  latestChat.current = chat;

   countFunction = () => {
    axios.get(`${rootUrl}Notification/UserNotificationCount`,{
      headers: {
        authorization: AuthStr
      }
    })
    .then(res => {
      
      this.setState({notificationCount : res?.data})
    })
  }

  initialFunction = () => {
    axios.get(`${rootUrl}Notification/GetInitial`,{
      headers: {
        authorization: AuthStr
      }
    })
    .then(res => {
      console.log(res,'111');
      this.setState({notificationData: res?.data?.result});
      
    })
  }

  allNotifications = () => {
    history.push(`/allNotifications`);
  }


  notificationByIdFunction = (data) => {
    axios.get(`${rootUrl}Notification/ViewNotification/${data}`,{
      headers: {
        authorization: AuthStr
      }
    })
    .then(res => {
      console.log(res,'abcdefg');
    })
  }


  redirect = (data) => {
    console.log(data);
     this.notificationByIdFunction(data?.id);
     history.push(data?.targetUrl);
  }

 
componentDidMount() { 

  axios.get(`${rootUrl}Notification/UserNotificationCount`,{
    headers: {
      authorization: AuthStr
    }
  })
  .then(res => {
    
    this.setState({notificationCount : res?.data})
  })

  axios.get(`${rootUrl}Notification/GetInitial`,{
    headers: {
      authorization: AuthStr
    }
  })
  .then(res => {
    console.log(res,'111');
    this.setState({notificationData: res?.data?.result});
    
  })

  const newConnection = new HubConnectionBuilder()
         .withUrl(`${rootUrl}notificationHub`)
         .withAutomaticReconnect()
         .build();
 
    //  this.setState = {connection : newConnection};

     if (newConnection) {
      newConnection.start()
          .then(result => {
              console.log('Connected!');

              newConnection.on('notificationHub', message => {
                  //  const updatedChat = [...latestChat.current];
                  // updatedChat.push(message);
              if(message){
               this.countFunction();

               this.initialFunction();
              
               
              }
                  // this.setState = {chat: message}
                  //  console.log(message)
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }
 }

 
 

 // Code testing end

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }


  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown })

  render() {

    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">


        {/* <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
          
            <i className="far fa-bookmark fa-20px"></i>
            <Badge pill color="primary" className="badge-up">
              {" "}
              15{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">5 New</h3>
                <span className="notification-title">App Notifications</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false
              }}
            >
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.PlusSquare
                      className="font-medium-5 primary"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="primary media-heading" tag="h6">
                      You have new order!
                    </Media>
                    <p className="notification-text">
                      Are your going to meet me tonight?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      9 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.DownloadCloud
                      className="font-medium-5 success"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="success media-heading" tag="h6">
                      99% Server load
                    </Media>
                    <p className="notification-text">
                      You got new order of goods?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      5 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.AlertTriangle
                      className="font-medium-5 danger"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="danger media-heading" tag="h6">
                      Warning Notification
                    </Media>
                    <p className="notification-text">
                      Server has used 99% of CPU
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Today
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.CheckCircle
                      className="font-medium-5 info"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="info media-heading" tag="h6">
                      Complete the task
                    </Media>
                    <p className="notification-text">
                      One of your task is pending.
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last week
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.File className="font-medium-5 warning" size={21} />
                  </Media>
                  <Media body>
                    <Media heading className="warning media-heading" tag="h6">
                      Generate monthly report
                    </Media>
                    <p className="notification-text">
                      Reminder to generate monthly report
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last month
                    </time>
                  </small>
                </Media>
              </div>
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <span className="align-middle">Read all notifications</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown> */}

        {/* <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            
            <i className="far fa-envelope fa-20px"></i>
            <Badge pill color="primary" className="badge-up">
              {" "}
              5{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">5 New</h3>
                <span className="notification-title">App Notifications</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false
              }}
            >
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.PlusSquare
                      className="font-medium-5 primary"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="primary media-heading" tag="h6">
                      You have new order!
                    </Media>
                    <p className="notification-text">
                      Are your going to meet me tonight?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      9 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.DownloadCloud
                      className="font-medium-5 success"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="success media-heading" tag="h6">
                      99% Server load
                    </Media>
                    <p className="notification-text">
                      You got new order of goods?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      5 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.AlertTriangle
                      className="font-medium-5 danger"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="danger media-heading" tag="h6">
                      Warning Notification
                    </Media>
                    <p className="notification-text">
                      Server has used 99% of CPU
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Today
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.CheckCircle
                      className="font-medium-5 info"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="info media-heading" tag="h6">
                      Complete the task
                    </Media>
                    <p className="notification-text">
                      One of your task is pending.
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last week
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.File className="font-medium-5 warning" size={21} />
                  </Media>
                  <Media body>
                    <Media heading className="warning media-heading" tag="h6">
                      Generate monthly report
                    </Media>
                    <p className="notification-text">
                      Reminder to generate monthly report
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last month
                    </time>
                  </small>
                </Media>
              </div>
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <span className="align-middle">Read all notifications</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown> */}

        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            {/*<Icon.Bell size={21} />*/}
            <i className="far fa-bell fa-20px"></i>
            <Badge pill color="primary" className="badge-up">
              {" "}
              {this?.state?.notificationCount}{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media notification-menu-style" >
            <li className="dropdown-menu-header">
             <div className="d-flex justify-content-between">
             <div className="dropdown-header mt-0">
                <h6 className=" notification-title text-white">{this?.state?.notificationCount} Unread Notifications</h6>
                
              </div>
              <div className="dropdown-header mt-0" style={{cursor: 'pointer'}}>
             
                
              </div>
             </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false
              }}
            >
             {
               this.state.notificationData?.map((data,i) => (
                  <div id={i} 
               
                  
                   className={data?.isSeen? 'd-flex justify-content-between notification-active-style': 'd-flex justify-content-between notification-inactive-style'}>
                <Media className="d-flex align-items-start">
                  {/* <Media left href="#">
                    <Icon.PlusSquare
                      className="font-medium-5 primary"
                      size={21}
                    />
                  </Media> */}
                
                 <Media body>
                    <Media style={{color: '#1e98b0'}} heading className=" media-heading" tag="h6" onClick={()=>this.redirect(data)}>
                      {data?.title}
                    </Media>
                    <p className="notification-text">
                      {data?.description}
                    </p>
                  </Media>
                  <small>
                   
                      {/* {handleDate(data?.createdOn)} */}
                 
                  </small>
                 
                </Media>
              </div> 
               ))
             }
           
             
            
             
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <div className="p-3 notification-footer-style text-center dropdown-bottom-header" onClick={()=>this.allNotifications()}>
                <span className="align-middle">Read All</span>
              </div>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {userInfo?.displayName}
              </span>
              <span className="user-status">{userInfo?.roleName}</span>
            </div>
            <span data-tour="user">
              <img
                src={rootUrl + userInfo?.displayImage}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
