const arr = ['a', 'b', 'c', 'd', 'f'];
let id = 0;

const callback = (id) => {
    console.log('FINISHED', id);
}

const post = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i, arr[i]);
            resolve();
        },  1000);
    });
}


const foo = () => {
    return new Promise((resolve, reject) => {
        post(id).then(() => {
            callback(id)
            if (id === arr.length) {
                resolve();
                return;
            }
            foo().then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
        id++;
    });
}

foo().then(() => {
    console.log('STUFF!');
});
