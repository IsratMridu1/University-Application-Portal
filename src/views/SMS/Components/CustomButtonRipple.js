import React from 'react';
import {
   
    Button,
  
  } from "reactstrap";

const CustomButtonRipple = ({isDisabled, className, icon,color, permission, type,url, func, name}) => {

   

    return (
        <>
         
            <Button.Ripple
               disabled={isDisabled}
               onClick={func}
               color={color}
               type={type}
               className={className}
             >
               {name}
            </Button.Ripple>
        </>
    );
};

export default CustomButtonRipple;