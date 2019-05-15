import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Treebeard } from 'react-treebeard';
import { allWrapper, searchWrapper, treeWrapper, pagesWrapper, noClick } from './ProjectsTree.module.scss';

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
        getProjectsList(101, page, batchSize).then((data) => {
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

    const amount = Math.ceil(itemsAmount / batchSize)
    const onFirstPage = () => setPage(1);
    const onPrevPage = () => setPage(page > 1 ? page - 1 : 1);
    const onNextPage = () => setPage(page < amount ? page + 1 : amount);
    const onLastPage = () => setPage(amount);
    

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
                <button onClick={onFirstPage}>{"<<"}</button>
                <button onClick={onPrevPage}>{"<"}</button>
                <button onClick={x => x} className={noClick} disabled={true}>{page}</button>
                <button onClick={onNextPage}>{">"}</button>
                <button onClick={onLastPage}>{">>"}</button>
            </div>
        </div>
    );
}

ProjectsTree.propTypes = {
    batchSize: propTypes.number.isRequired,
}

ProjectsTree.defaultProps = {
    batchSize: 25,
}

export default ProjectsTree;