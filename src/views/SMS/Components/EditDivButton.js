import React from 'react';

const EditDivButton = (props) => {
    const {className, func, permission} = props;

 

    return (
        <>
          
           
            <div className={className} onClick={func}>
              <div className="text-right">
                  <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
              </div>
            </div>
           
       
        </>
    );
};

export default EditDivButton;