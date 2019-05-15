import React from 'react';
import { margin } from './SignInPanel.module.scss';

function Pending () {
    return (
        <div className={margin}>
            <i className="fa fa-9x fa-spinner faa-slow faa-spin animated"/>
        </div> 
    );
}

export default Pending;