import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Treebeard } from 'react-treebeard';
import { allWrapper, searchWrapper, treeWrapper, pagesWrapper, noClick } from './ProjectsTree.module.scss';

import { addNewFile as addNewFileAction, setSelection as setSelectionAction } from '../../actions/filesActions';
import getProjectsList from '../../api/getProjectsList';
import getFile from '../../api/getFile';

import convertProjectFile from '../../helpers/convertProjectFile';

function ProjectsTree({ batchSize, files, addNewFile, setSelection }) {
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
        const items = {...data};
        let item, iProject, jArchive, kFile;
        items.children.forEach(i => {
            i.active = false;
            if (i.id === node.id) {
                item = i;
            } else {
                i.children.forEach(j => {
                    j.active = false;
                    if (j.id === node.id) {
                        item = j;
                    } else {
                        j.children.forEach(k => {
                            k.active = false;
                            if (k.id === node.id) {
                                item = k;
                                iProject = i.value;
                                jArchive = j.value;
                                kFile = k.value;
                            }
                        })
                    }
                });
            }
        });

        if (item) {
            if (node.children) {
                item.toggled = !item.toggled;
            } else {
                const filePath = `${iProject}/${jArchive}/${kFile}`;
                let resFile = files[filePath];

                if (!resFile) {
                    getFile(filePath).then((res) => {
                        console.log("FILES", res);
                        resFile = res && res.data && res.data.data || {};
                        resFile = convertProjectFile(resFile);
                        addNewFile(filePath, resFile);
                        setSelection(filePath);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    addNewFile(filePath, resFile);
                    setSelection(filePath);
                }
            }
            item.active = true;
            setData(items);
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

const mapStateToProps = (state) => ({
    files: state.files,
});

const mapDispatchToProps = (dispatch) => ({
    addNewFile: (path, value) => dispatch(addNewFileAction(path, value)),
    setSelection: (path) => dispatch(setSelectionAction(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTree);