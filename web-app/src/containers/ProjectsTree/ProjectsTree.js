import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Treebeard } from 'react-treebeard';
import { allWrapper, searchWrapper, treeWrapper, pagesWrapper, active } from './ProjectsTree.module.scss';

import getProjectsList from '../../api/getProjectsList';

function ProjectsTree({ batchSize }) {
    const [data, setData] = useState({
        id: 'projects-0',
        name: 'Projects',
        children: [],
    });
    const [activeId, setActiveId] = useState(null);
    const [page, setPage] = useState(1);
    const [itemsAmount, setItemsAmount] = useState(0);
    

    useEffect(() => {
        getProjectsList(1000, page, batchSize).then((data) => {
            setData(data.items);
            setItemsAmount(data.allItemsAmount);
        });
    }, [page]);

    const onToggle = (node) => {
        if (node.children) {
            const cpData = {...data};
            const selected = cpData.children.find(n => n.id === node.id);
            if (activeId !== null) {
                const active = cpData.children.find(n => n.id === activeId);
                if (active) {
                    active.active = false;
                }
            }
            if (selected) {
                selected.toggled = !selected.toggled;
                selected.active = true;
                setData(cpData);
                setActiveId(selected.id);
            }
        } else {
            console.log('OPEN FILE', node.id, node.path);
        }
    }

    const onPageChange = (number) => () => {
        setPage(number);
    }

    return (
        <div className={allWrapper}>
            <div className={searchWrapper}>
                <input />
                <span>Search</span>
            </div>
            <div className={treeWrapper}>
                <div>
                    <Treebeard data={data} onToggle={onToggle} />
                </div>
            </div>
            <div className={pagesWrapper}>
                {generatePaginationButton(
                    Math.ceil(itemsAmount/batchSize),
                    page,
                    onPageChange,
                )}
            </div>
        </div>
    );
}

ProjectsTree.propTypes = {
    batchSize: propTypes.number.isRequired,
}

ProjectsTree.defaultProps = {
    batchSize: 200,
}

export default ProjectsTree;

function generatePaginationButton(amount, selected, callback) {
    const elements = [];
    for (let i = 1; i <= amount; i++) {
        elements.push(
            <button key={`pagination-${i}`} onClick={callback(i)} className={selected === i ? active: ''}>
                {i}
            </button>
        );
    }
    return elements;
}