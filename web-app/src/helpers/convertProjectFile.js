
import { interpolatePlasma } from 'd3-scale-chromatic';

const scale = 40;
export default function convertProjectFile (data) {
    const vertices = [];
    const indices = [];
    const bcs = [];

    let minBC = Infinity;
    let maxBC = -Infinity;

    let isNode = false;
    let isElementSolid = false;
    
    data
    .split('\n')
    .forEach(line => {
        if (line.includes('*NODE')) {
            isNode = true;
            isElementSolid = false;
            return;
        }
        if (line.includes('*ELEMENT_SOLID')) {
            isNode = false;
            isElementSolid = true;
            return;
        }
        if (line === '*END') {
            return;
        }


        if (isNode) {
            const [nid, x, y, z, bc] = line.split(',').map(i => Number(i));
            if (bc < minBC) {
                minBC = bc;
            }
            if (bc > maxBC) {
                maxBC = bc;
            }

            vertices.push(x * scale, y * scale, z * scale);
            bcs.push(bc);
        }

        if (isElementSolid) {
            const [eid, pid, ...n] = line.split(',').map(i => Number(i - 1)); // nid1, nid2, nid3, nid4, nid5, nid6, nid7, nid8
            indices.push(
                n[0], n[1], n[2], n[0], n[2], n[3],
                n[4], n[5], n[6], n[4], n[6], n[7],
                n[0], n[3], n[7], n[0], n[7], n[4],
                n[1], n[2], n[6], n[1], n[6], n[5],
                n[0], n[4], n[5], n[0], n[5], n[1],
                n[3], n[7], n[6], n[3], n[6], n[2],
            );
        }
    });

    const colors = [];
    const bcDif = maxBC - minBC;
    bcs.forEach(bc => {
        if (bcDif === 0) {
            const c = interpolatePlasma(0);
            const r = parseInt(c[1]+c[2], 16) / 255;
            const g = parseInt(c[3]+c[4], 16) / 255;
            const b = parseInt(c[5]+c[6], 16) / 255;
            colors.push(r, g, b);
        } else {
            let v = (bc - minBC) / (maxBC - minBC);
            const c = interpolatePlasma(v);
            const r = 1 - parseInt(c[1]+c[2], 16) / 255;
            const g = 1 - parseInt(c[3]+c[4], 16) / 255;
            const b = 1 - parseInt(c[5]+c[6], 16) / 255;
            colors.push(r, g, b);
        }
    });

    return { colors, vertices, indices };
}