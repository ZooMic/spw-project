import React, { useState } from 'react';
import { outer, inner, closeBtn } from './WindowPanel.module.scss';

function WindowPanel ({ children, onClose }) {

    return (
        <div className={outer}>
            <div className={inner}>
                {children}
            </div>
            <button onClick={onClose} className={closeBtn}><i className="fa fa-times-circle"/></button>
        </div>
    );
};

export default WindowPanel;
