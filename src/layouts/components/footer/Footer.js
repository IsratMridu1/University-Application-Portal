import React from "react"
import ScrollToTop from "react-scroll-up"
import { Button } from "reactstrap"
import { ArrowUp } from "react-feather"
import classnames from "classnames"
import Lgimage from"../../../assets/img/UappLogo.png"
const Footer = () => {
  return (
    <footer className={classnames("footer footer-light uapp-footer-main", "static" ,"footer-custom-style")}>

      {/* <div className="row">
        <div className="col-sm-4 text-sm-center footer-text">
        <span className="text-md-left d-block d-md-inline-block mt-25">
        <a href="/">UAPP</a>
        © SMS Higher Education Group.
        </span>
            </div>
        <div className="col-sm-4 text-center footer-text"> 
        <span className="text-center">For support : support@uapp.uk</span>
         </div>
        <div className="col-sm-4 text-sm-center footer-text"> 
        <span className="text-md-right ">
          <span className="align-middle">Powered by </span>{" "}
          <a href="#">Jpro UK ltd.</a>
        </span>
         </div>
      </div> */}

        <div className="uapp-footer ">

        <div className="row justify-content-center">
          <div className="show-max-678 uapp-footer-img">
              <img src={Lgimage}/>
              </div>
          </div>
          <div className="row">
          <div className="col-md-4 col-sm-12 order-md-1 order-3  footer-text">

            <a href="/">UAPP</a>
            <span>  © SMS Higher Education Group.</span>

            </div>

            <div className="col-md-4 col-sm-12 order-md-2  order-1 footer-text">
            <ul className="uapp-footer-list">
              <li> <a href="javascript:void(0)">Privacy policy </a> </li>
              <li> <a href="javascript:void(0)">Terms & conditions </a> </li>
            </ul>  
            
             </div>

            <div className="col-md-4 col-sm-12 order-md-3 d-flex justify-content-center order-2  footer-text"> 
            <span className="text-center">support: support@uapp.uk</span> 
            <span className="align-middle ml-2">Powered by   <a href="#">Jpro UK ltd.</a> </span>
            
         </div>


          </div>
        </div>

      <p className="mb-0 clearfix">
        
       
        
      </p>
      <ScrollToTop showUnder={160}>
        <Button color="primary" className="btn-icon scroll-top">
          <ArrowUp size={15} />
        </Button>
      </ScrollToTop>
    </footer>
  )
}

export default Footer
