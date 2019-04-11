import React from 'react';
import { Treebeard } from 'react-treebeard';
import {} from './ProjectsTree.module.scss';


// http://storybooks.github.io/react-treebeard/
const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

function ProjectsTree () {
    return <Treebeard data={data} />
}

export default ProjectsTree;