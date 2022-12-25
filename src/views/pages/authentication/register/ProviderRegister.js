import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import RegisterFirebase from "./RegisterFirebase"
import RegisterAuth0 from "./RegisterAuth0"
import ProviderRegisterJWT from "./ProviderRegisterJWT"
import registerImg from "../../../../assets/img/pages/register.jpg"
import "../../../../assets/scss/pages/authentication.scss"
import LoginNavbar from "../login/LoginNavbar"
import UappLogo from '../../../../assets/img/UappLogo.png'; 
import Lgimage from"../../../../assets/img/UappLogo.png"
import Footer from "../../../../layouts/components/footer/Footer"

class ProviderRegister extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <div>
        


        <div className="" style={{ backgroundColor:"#fff" }}>
        <div className="responsive-top">
        <Row className="m-0">
        <Col lg="6" md="6" className="hide-responsive-left-side px-1 py-0">
                <div className="flexbox-container" style={{ backgroundColor:"#EAF6F9" }}>
                <div>
                <img src={UappLogo} className='w-50 mt-5 ms-5' />
                </div>
                </div>
              
        </Col>

        <Col lg="6" md="6" className="p-0">
        <div className="text-center hide-responsive-right-side">
        <img src={UappLogo} className='w-50' />
        </div>
            <div className="flexbox-container2" style={{ backgroundColor: "#fff", height: '100vh'  }} >
              
                <Card className="rounded-0 mb-0 px-2 md-p" style={{ boxShadow: "none", width:"100%" }}>
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0 login-page-heading-style">Provider Registration Form</h4>
                    </CardTitle>
                  </CardHeader>
                 
                  <Nav tabs className="px-2">
                    
                  </Nav>
                  
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <ProviderRegisterJWT />
                      </TabPane>
                    </TabContent>
                  
                </Card>
            </div>
        </Col>
       
      </Row>
      </div>
      </div>

      <Footer></Footer>
      
      </div>
    )
  }
}
export default ProviderRegister
