const fs = require('fs');
const filebase = require('../../filebase/filebase.json');

const projectExist = projectName => !!filebase.list.find(name => name === projectName);

const canUserView = (user, projectName) => {
    // IF PROJECT NOT EXIST - ONLY ADMIN CAN CREATE PROJECT
    if ((!projectExist(projectName)) && user.type === 'admin') {
        return true;
    }
    // IF PROJECT EXIST - USER NAME MUST BE SET IN META
    return !!require(`../../filebase/${projectName}/meta.json`).users.find(user => user === user.username);
}

const createFilebaseTree = user => {
    const data = {
        id: 'projects-0',
        name: 'Projects',
        children: [],
        toggled: true,
    }

    for (let i = 0; i < filebase.list.length; i++) {
        const project = filebase.list[i];
        
        if (canUserView(user, project)) {
            
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
                folder.children = files
                .sort((a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]))
                .map(file => ({
                    id: `${project}-${meta.list[j]}-${j}-${file}`,
                    name: file,
                }));
            }
        }
    }
    return { items: data, allItemsAmount: data.children.length };
}

const getLatest = projectName => {
    if (projectExist(projectName)) {
        const meta = require(`${process.env.CURRENT_PATH}/filebase/${projectName}/meta.json`);
        return meta.latest;
    }
    return null;
}

module.exports = {
    projectExist,
    canUserView,
    createFilebaseTree,
    getLatest,
};