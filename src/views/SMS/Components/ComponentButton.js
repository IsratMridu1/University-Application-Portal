import React from 'react';


const ComponentButton = (props) => {

    const { color, className, icon, permission, name, func} = props;

    return (
         <>


        
       
            <button  className={className} onClick={func}>
               {icon}
            </button>
         
        
        
            
        </>
    );
};

export default ComponentButton;