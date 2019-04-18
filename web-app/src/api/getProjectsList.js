import faker from 'Faker';

let isInitialized = false;
const data = {
    items: [],
    allItemsAmount: 0,
};


// http://storybooks.github.io/react-treebeard/
export default function getProjectsList(numberOfItems, page, batchSize) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!isInitialized) {
                const items = {
                    id: 'projects-0',
                    name: 'Projects',
                    children: [],
                    toggled: true,
                };
    
                for (let i = 1; i <= numberOfItems; i++) {
                    const name = faker.Name.findName();
                    const addres = faker.Address.city();
                    const email = faker.Internet.email();
    
                    items.children.push({
                        id: name + i,
                        name: name + ' ' + i,
                        toggled: false,
                        children: [{
                            id: email + i,
                            name: email,
                            test: 'TEST',
                        }, {
                            id: addres + i,
                            name: addres,
                            test: 'TEST',
                        }],
                    });
                }
                data.items = items;
                data.allItemsAmount = numberOfItems;
                isInitialized = true;
            }

            const result = {
                allItemsAmount: data.allItemsAmount,
                items: {...data.items},
            };

            result.items.children = [];

            const start = (page - 1) * batchSize;
            let stop = start + batchSize;
            if (stop > result.allItemsAmount) {
                stop = result.allItemsAmount;
            }

            for (let i = start; i < stop; i++) {
                result.items.children.push(data.items.children[i]);
            }
            
            resolve(result);
        });
    }); 
};