import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { main, toolbar, display} from './Panel3D.module.scss';
import useFitCanvasToParent from '../../hooks/useFitCanvasToParent';

import glProcessing from './helpers/glProcessing';

function Panel3D({ files: { data, selected } }) {
    const [canvasRef, canvasSize] = useFitCanvasToParent();

    useEffect(() => {
        if (data && selected) {
            const { vertices, colors, indices } = data[selected];
            if (canvasRef && canvasRef.current) {
                glProcessing(canvasRef.current, vertices, colors, indices);
            }
        }
    });

    return (
        <div className={main}>
            <div className={toolbar}>
                
            </div>
            <div className={display}>
            {
                !!canvasSize ?
                <canvas ref={canvasRef} width={canvasSize[0]} height={canvasSize[1]}/> :
                <canvas ref={canvasRef} />
            }
            </div>
        </div>
    );
}

Panel3D.propTypes = {
    files: PropTypes.object,
}
Panel3D.defaultProps = {
    files: {
        data: [],
        selected: '',
    }
}

const mapStateToProps = (state) => ({
    files: state.files,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel3D);