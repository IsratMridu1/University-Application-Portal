import React from "react"
import themeConfig from "../configs/themeConfig"
import classnames from "classnames"

const FullPageLayout = ({ children, ...rest }) => {
  return (
    //<div
    //  className={classnames(
    //    "full-layout wrapper bg-full-screen-image blank-page dark-layout",
    //    {
    //      "layout-dark": themeConfig.layoutDark
    //    }
    //  )}
    //>
    <div
      className={classnames(
        "full-layout wrapper  blank-page dark-layout",
        {
          "layout-dark": themeConfig.layoutDark
        }
      )}
      style={{ backgroundColor: "#eff2f7"}}
    >
      
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
       {/*     <div className="flexbox-container">*/}
            <div className="">
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPageLayout
