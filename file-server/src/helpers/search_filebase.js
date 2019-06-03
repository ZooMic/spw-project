const fs = require('fs');
const path = require('path');
console.log('process.env.CURRENT_PATH', );

let filebase = require(path.join(process.env.CURRENT_PATH, 'filebase/filebase.json'));

const getFilebase = () => {
    return {...filebase};
}

const setFilebase = newFilebase => {
    filebase = newFilebase;
    fs.writeFileSync(path.join(process.env.CURRENT_PATH, 'filebase/filebase.json'), JSON.stringify(newFilebase));
}

const projectExist = projectName => !!getFilebase().list.find(name => name === projectName);

const canUserView = (user, projectName) => {
    if (projectExist(projectName)) {
        const meta = require(path.join(process.env.CURRENT_PATH, `filebase/${projectName}/meta.json`));
        return !!meta.users.find(u => u === user.username);
    }
    return false;
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
                value: project,
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
                        value: meta.list[j],
                    });
                } else {
                    proj.children.push({
                        id: `${project}-${meta.list[j]}-${j}`,
                        name: meta.list[j],
                        toggled: false,
                        children: [],
                        value: meta.list[j],
                    });
                }
                let folder = proj.children[j];
                let files = fs.readdirSync(`${process.env.CURRENT_PATH}/filebase/${project}/${meta.list[j]}/`);
                folder.children = files
                .sort((a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]))
                .map(file => ({
                    id: `${project}-${meta.list[j]}-${j}-${file}`,
                    name: file,
                    value: file,
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
    getFilebase,
    setFilebase,
};