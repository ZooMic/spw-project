import { useEffect, useState, useRef } from 'react';


/**
 * ONLY WORKS IF PARENT COMPONENT HAVE CSS:
   - height: 100%;
   - display: flex;
   - justify-content: center;
   - align-content: center;

   AND CANVAS
   - width: 100%;
 */

export default function useFitCanvasToParent(debounce = 0) {
    const ref = useRef(null);
    const [size, setSize] = useState(null);
    let timeout = null;

    useEffect(() => {
        const onResize = () => {
            if (!!timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                const canvas = ref.current;
                if (canvas) {
                    const { width, height } = canvas.getBoundingClientRect();
                    setSize([width, height]);
                }
            }, debounce);
            
        }
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    return [ref, size];
}