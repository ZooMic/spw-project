import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/registrationActions'
import { main, first, noDisplay, wrapper } from './MainNavigation.module.scss';


function MainNavigation ({ logoutAction }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const onCollapsed = () => setIsCollapsed(!isCollapsed);

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
});

const mapDispatchToProps = (dispatch) => ({
    logoutAction: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
