import React, { Fragment } from 'react';
import FileUpload from './FileUpload/';

// redux state
import { connect } from 'react-redux';
import { openWindow as openWindowAction, closeWindow as closeWindowAction } from '../../actions/windowsActions';


function Windows ({ windows, closeWindow }) {
    const { files } = windows;
    return (
        <Fragment>
            <FileUpload isVisible={files} onClose={closeWindow}/>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({ windows: state.windows });

const mapDispatchToProps = (dispatch) => ({
    openWindow: windowName => dispatch(openWindowAction(windowName)),
    closeWindow: () => dispatch(closeWindowAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Windows);
