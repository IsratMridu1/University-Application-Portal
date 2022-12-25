import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/core/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
// import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"
import axios from "axios"

import { rootUrl } from "../../../ReusableFunction/Api/ApiFunc"

class ConsultantLoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    error: "",
    emailerror: "",
    passwordError: "",
  }

  handleLogin = e => {
    e.preventDefault()
    var loggedInUser = {id: 0, email: '', name: '', image: 'gbhgyhgv', loggedInWith: 'jwt'}
    // axios
    //   .post(`${rootUrl}/Account/Login`, {
    //     Email: this.state.email,
    //     Password: this.state.password
    //   })
    //   .then(response => {
    //     if (response.data) {
    //       if(response.data.isSuccess == true){
    //         this.setState({error: ''});
    //         localStorage.setItem('token',response.data.message);
    //         const AuthStr = 'Bearer ' + response.data.message;
    //         history.push("/")
    //         window.location.reload();

    //       }else{
    //         // alert('email not valid')
    //         this.setState({error: 'Email or Password Is Not Valid'})
    //         if(response.data.message === 'Wrong Creadentials'){
    //           this.setState({emailerror: 'Invalid Email', passwordError: ''})
    //         }else if(response.data.message === 'Wrong Password'){
    //           this.setState({passwordError: 'Wrong Password', emailerror: ''})
    //         }else{
    //           this.setState({error: 'Something Went Wrong! please try again', emailerror: '', passwordError: ''})
    //         }
            
    //       }

          
    //     }
    //   })
    //   .catch()
  }
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left" >
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value, emailerror: '' })}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                required
              />
              <div className="form-control-position">
                
              </div>
              <Label style={{ fontSize: "14px", top:"-29px" }}>Email</Label>
              {this.state.emailerror && <span className="text-danger">{this.state.emailerror}</span>}
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left" style={{ marginTop: "30px" }}>
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value, passwordError: '' })}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                required
              />
              <div className="form-control-position">
          
              </div>
              <Label style={{ fontSize: "14px", top: "-29px" }}>Password</Label>
              {this.state.passwordError && <span className="text-danger">{this.state.passwordError}</span>}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
                
              />
              <div className="float-right">
                <Link to="/pages/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">

            <Button.Ripple className="uapp-submit-btn" color="primary" type="submit">
                Login
              </Button.Ripple>
              <Link to="/pages/consultantRegister">Create a Consultant Account</Link>
            </div>
            {/* {this.state.error && <span className="text-danger">{this.state.error}</span>} */}
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps)(ConsultantLoginJWT)
