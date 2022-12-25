import React, { useState } from 'react';

const Demo2 = () => {


    const arrayValues = [1,10,11,20,25];

    const [sState, setSState] = useState(0);

    const handleRender = (value) =>{

        console.log(value);

    }






    return (
        <div>

        <button onClick={()=>handleRender(1)}>1</button>
        <button onClick={()=>handleRender(10)}>10</button>
        <button onClick={()=>handleRender(11)}>11</button>
        <button onClick={()=>handleRender(20)}>20</button>
        <button onClick={()=>handleRender(25)}>25</button>
            
        </div>
    );
};

export default Demo2;