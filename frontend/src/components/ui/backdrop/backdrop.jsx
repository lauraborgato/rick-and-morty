import React from 'react';
import './backdrop.scss';


function Backdrop({ show, clicked }) {
    return (
        show ? <div className="main-backdrop" onClick={clicked}></div> : null
    );
}

export default Backdrop;