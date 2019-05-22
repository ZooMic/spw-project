import React from 'react';
import { outer, inner, closeBtn } from './WindowPanel.module.scss';

function WindowPanel ({ children, onClose, isVisible }) {
    if (!isVisible) {
        return null;
    }

    const toReturn =
    <div className={outer}>
        <div className={inner}>
            {children}
        </div>
        <button onClick={onClose} className={closeBtn}><i className="fa fa-times-circle"/></button>
    </div>

    if (isVisible) {
        return toReturn;
    } else {
        return null;
    }
};

export default WindowPanel;
