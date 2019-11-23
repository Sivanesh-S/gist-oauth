const fs = require('fs');

// user modules
const treeView = require('./tree-view');
const location = `${__dirname}\\test\\notes`;
treeView(location);
