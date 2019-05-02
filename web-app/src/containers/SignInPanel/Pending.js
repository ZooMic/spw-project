import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { margin } from './SignInPanel.module.scss';

function Pending ({ }) {
    return (
        <div className={margin}>
            <FontAwesomeIcon icon="spinner" size="9x" spin={true} color="#cecece"/>
        </div> 
    );
}

export default Pending;