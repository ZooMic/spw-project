import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/registrationActions';
import { openWindow as openWindowAction } from '../../actions/windowsActions';
import { main, first, noDisplay, wrapper, active } from './MainNavigation.module.scss';
import Chat from '../Chat';


function MainNavigation ({ logoutAction, setFileUploadOpen, fileWindowOpened, setWindowContent }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { files } = windows;

    const onCollapsed = () => setIsCollapsed(!isCollapsed);
    const onFileUpload = () => openWindow('files');

    const onMailClick = () => {
        setWindowContent(<span> MAIL </span>)
    };

    const onChatClick = () => {
        setWindowContent(<Chat></Chat>)
    };

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
                    <button onClick={onFileUpload} className={files ? active : ''}>
                        <i className="fa fa-2x fa-folder-plus"/>
                    </button>
                    <button><i className="fa fa-2x fa-users-cog"/></button>
                    <button onClick={onMailClick}><i className="fa fa-2x fa-envelope faa-shake animated"/></button>
                    <button onClick={onChatClick}><i className="fa fa-2x fa-comments faa-tada animated"/></button>
                    <button onClick={logoutAction}><i className="fa fa-2x fa-sign-out-alt"/></button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    windows: state.windows,
});

const mapDispatchToProps = (dispatch) => ({
    openWindow: windowName => dispatch(openWindowAction(windowName)),
    logoutAction: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
