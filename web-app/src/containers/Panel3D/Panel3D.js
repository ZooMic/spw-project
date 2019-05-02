import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import * as THREE from 'three'; 

import { main, toolbar, display} from './Panel3D.module.scss';
import useFitCanvasToParent from '../../hooks/useFitCanvasToParent';

let scene = null;
let camera = null;
let renderer = null;

function Panel3D({ }) {
    const [canvasRef, canvasSize] = useFitCanvasToParent();

    useEffect(() => {
        if (!!canvasSize) {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, canvasSize[0] / canvasSize[1], 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        }
    }, [canvasSize]);

    useEffect(() => {
        if (scene) {
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let edges = new THREE.EdgesGeometry(geometry);

            let box_material = new THREE.MeshBasicMaterial({ color: 0xff0000, linewidth: 4 });
            let edge_material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 4 });

            let box_cube = new THREE.Mesh(geometry, box_material);
            let edge_cube = new THREE.LineSegments(edges, edge_material);
    
            scene.add(box_cube);
            scene.add(edge_cube);
    
            camera.position.z = 5;
    
            const animate = () => {
                requestAnimationFrame(animate);
                box_cube.rotation.x += 0.01;
                box_cube.rotation.y += 0.01;
                edge_cube.rotation.x += 0.01;
                edge_cube.rotation.y += 0.01;
    
                renderer.render(scene, camera);
            }
            animate();
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

Panel3D.propTypes = {}
Panel3D.defaultProps = {}

export default Panel3D;