import React from 'react'
import { useHistory } from 'react-router';
import { Col, Row, Nav, Navbar, NavItem, NavLink, NavbarBrand, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownItem, NavbarText, Collapse, DropdownMenu, Button} from 'reactstrap';
import Uapp from '../../../../assets/img/UappLogo.png'
const LoginNavbar = () => {

  const history = useHistory();
  const navigate = (url) => {
    history.push(url);
  }


  return (
    <div className="uapp-user-nav">

 {/*       style={{ width: "100%", zIndex: "1200", position: "absolute", top: "0" }}*/}

      <Navbar expand="md" className="navbar navbar-expand-lg shadow-sm fixed-top" style={{background:"#fff"}} >
            <NavbarBrand className="login-nav-logo">
              <img src={Uapp} />
            </NavbarBrand>
         
              <Nav className="ml-auto" navbar>

                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                  <Button className='badge-primary'>  <i class="fas fa-user-plus"></i>   Register</Button>
                  </DropdownToggle> 

                  <DropdownMenu right>
                    <DropdownItem className="d-block w-100 login-nav-dropdown-item" onClick={()=>navigate('/pages/studentRegister')}>
                      Student
                    </DropdownItem>
                    <DropdownItem className="d-block w-100 login-nav-dropdown-item" onClick={()=>navigate('/pages/consultantRegister')}>
                      Consultant
                    </DropdownItem>
                    <DropdownItem className="d-block w-100 login-nav-dropdown-item" onClick={()=>navigate('/pages/providerRegister')}>
                      Provider
                    </DropdownItem>

                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
          </Navbar>






        </div>


    )
}

export default LoginNavbar
