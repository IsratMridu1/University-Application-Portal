import React from "react"
import "../../../assets/scss/components/app-loader.scss"
import loader from '../../../assets/img/load.gif';
class ComponentSpinner extends React.Component {
  render() {
    return (
      <div className="text-center">
        {/* <div className="loading component-loader">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div> */}
        <img src={loader}  className="img-fluid" alt="uapp_loader_image" />

      </div>
    )
  }
}

export default ComponentSpinner
