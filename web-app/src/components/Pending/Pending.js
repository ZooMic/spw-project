import React from 'react';
import { main, text } from './Pending.module.scss';

function Pending ({ className, children }) {
    return (
        <div className={`${main} ${className}`}>
            <i className="fa fa-9x fa-spinner faa-slow faa-spin animated"/>
            {
                <div className={text}>
                    { children ? children : null }
                </div>
            }
        </div>
    );
}

export default Pending;