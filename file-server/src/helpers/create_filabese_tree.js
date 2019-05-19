const filebase = require('../../filebase/filebase.json');
const canUserView = require('./search_filebase').canUserView;


module.exports = {
    projectExist,
    canUserView,
};