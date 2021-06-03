import React from 'react';
import preloader from "../../../assets/images/prelouder.gif";


export const Preloader = () => {
    return <div style={{background: "white"}}>
        < img src={preloader}/>
    </div>
}