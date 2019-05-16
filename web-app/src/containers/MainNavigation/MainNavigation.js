import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/registrationActions';
import { fileUploadSetOpen } from '../../actions/fileUploadActions';
import { main, first, noDisplay, wrapper, active } from './MainNavigation.module.scss';


function MainNavigation ({ logoutAction, setFileUploadOpen, fileWindowOpened }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const onCollapsed = () => setIsCollapsed(!isCollapsed);
    const onFileUpload = () => setFileUploadOpen(!fileWindowOpened);

    return (
        <div className={main}>
            <div className={wrapper}>
                <button onClick={onCollapsed} className={first}>
                    {
                        isCollapsed ?
                            <i className="fa fa-2x fa-chevron-circle-right faa-horizontal animated"/> :
                            <i className="fa fa-2x fa-chevron-circle-left faa-horizontal animated"/>
                    }
                </button>
                <div className={isCollapsed ? '' : noDisplay}>
                    <button onClick={onFileUpload} className={fileWindowOpened ? active : ''}>
                        <i className="fa fa-2x fa-folder-plus"/>
                    </button>
                    <button><i className="fa fa-2x fa-users-cog"/></button>
                    <button><i className="fa fa-2x fa-envelope faa-shake animated"/></button>
                    <button><i className="fa fa-2x fa-comments faa-tada animated"/></button>
                    <button onClick={logoutAction}><i className="fa fa-2x fa-sign-out-alt"/></button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    fileWindowOpened: state.fileUpload.isOpened,
});

const mapDispatchToProps = (dispatch) => ({
    logoutAction: () => dispatch(logout()),
    setFileUploadOpen: (shouldOpen) => dispatch(fileUploadSetOpen(shouldOpen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
