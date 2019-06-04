import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { main, toolbar, display} from './Panel3D.module.scss';
import useFitCanvasToParent from '../../hooks/useFitCanvasToParent';

import glProcessing from './helpers/glProcessing';

let mouseLastPosition = {};
let isMouseDown = false;
const angle = { x: 0, y: 0};

function Panel3D({ files: { data, selected } }) {
    const [canvasRef, canvasSize] = useFitCanvasToParent();
    const [temp_angle, setAngle] = useState({ x: 0, y: 0 });

    const onMouseDown = e => {
        mouseLastPosition = { x: e.clientX, y: e.clientY };
        isMouseDown = true;
    }

    const onMouseMove = e => {
        if (isMouseDown) {
            const x = mouseLastPosition.x - e.clientX;
            const y = mouseLastPosition.y - e.clientY;
            mouseLastPosition = { x: e.clientX, y: e.clientY };

            const ax = (angle.x + x) % 360;
            const ay = (angle.y + y) % 360;
            angle.x = ax < 0 ? 360 + ax : ax;
            angle.y = ay < 0 ? 360 + ay : ay;
            setAngle({...angle});
        }
    }

    const onMouseUp = () => {
        isMouseDown = false;
    }


    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.addEventListener("mousedown", onMouseDown);
            canvas.addEventListener("mousemove", onMouseMove);
            canvas.addEventListener("mouseup", onMouseUp);
        }
    }, [canvasRef]);

    useEffect(() => {
        if (data && selected) {
            const { vertices, colors, indices } = data[selected];
            if (canvasRef && canvasRef.current) {
                glProcessing(canvasRef.current, vertices, colors, indices, angle);
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