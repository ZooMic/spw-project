let counter = 1;

const getFilesTree = (basicPath, name, object) => {
    const currentPath = path.join(basicPath, name);
    const stats = fs.lstatSync(currentPath);

    const parent = {
        id: counter++,
        name: name,
        toggled: false,
        size: 0,
    };
    object.push(parent);

    if (stats.isDirectory()) {
        const files = fs.readdirSync(currentPath);
        parent.children = [];
        files.forEach(file => {
            getFilesTree(currentPath, file, parent.children);
        });
        parent.children.forEach(child => {
            parent.size += child.size;
        });
    } else if (stats.isFile()) {
         parent.size = stats.size;
    } else {
        console.error('Something went wrong!', stats);
    }
};

module.exports = getFilesTree;