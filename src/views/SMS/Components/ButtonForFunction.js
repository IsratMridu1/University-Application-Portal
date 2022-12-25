import React from 'react';
import {
   
    Button,
  
  } from "reactstrap";

const ButtonForFunction = ({className, icon,color, permission, type,url, func, name,disable}) => {
    // const {className, icon} = props;

 


    const data = [1,2,3,4,6];



    return (
        <>
          {/* {
            data.includes(permission) ?  */}
            <Button
               onClick={func}
               color={color}
               type={type}
               className={className}
               disabled={disable}
             >
               {" "}
               {icon}{name}{" "}
            </Button>
            {/* :
            null
          }    */}
        </>
    );
};

export default ButtonForFunction;