const fs = require('fs');
const filebase = require('../../filebase/filebase.json');


const projectExist = projectName => !!filebase.list.find(name => name === projectName);

const canUserView = (username, projectName) => {
    if (!projectExist(projectName)) {
        return true;
    }
    return !!require(`../../filebase/${projectName}/meta.json`).users.find(user => user === username);
}

const createFilebaseTree = username => {
    const data = {
        id: 'projects-0',
        name: 'Projects',
        children: [],
        toggled: true,
    }

    for (let i = 0; i < filebase.size; i++) {
        const project = filebase.list[i];
        console.log('project', username, project);
        
        if (canUserView(username, project)) {
            
            let id = data.children.push({
                id: `${project}-${i}`,
                name: project,
                children: [],
                toggled: false,
            });

            let meta = require(`../../filebase/${project}/meta.json`);
            let proj = data.children[id - 1];

            for (let j = 0; j < meta.list.length; j++) {
                if (meta.latest === meta.list[j]) {
                    proj.children.push({
                        id: `${project}-${meta.list[j]}-${j}`,
                        name: `${meta.list[j]} [L]`,
                        toggled: false,
                        children: [],
                    });
                } else {
                    proj.children.push({
                        id: `${project}-${meta.list[j]}-${j}`,
                        name: meta.list[j],
                        toggled: false,
                        children: [],
                    });
                }
                let folder = proj.children[j];
                let files = fs.readdirSync(`${process.env.CURRENT_PATH}/filebase/${project}/${meta.list[j]}/`);
                folder.children = files.map(file => ({
                    id: `${project}-${meta.list[j]}-${j}-${file}`,
                    name: file,
                }));
            }
        }
    }
    return { items: data, allItemsAmount: data.children.length };
}

module.exports = {
    projectExist,
    canUserView,
    createFilebaseTree,
};