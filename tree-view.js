const fs = require('fs');

module.exports = function(location) {
  const files = readCurrentDirectory(location);
  allFiles = iterateFilesAndFolders(files, location);
  console.log('allFiles', allFiles[4]);
};

function readCurrentDirectory(location, withFileTypes = true) {
  return fs.readdirSync(location, { withFileTypes });
}

function writeLine() {}

// Array structure
function iterateFilesAndFolders(files, location) {
  const allFiles = [];
  files.forEach(file => {
    if (file.isDirectory()) {
      const subDirectoryName = `${location}\\${file.name}`;
      const subDirectoryFiles = readCurrentDirectory(subDirectoryName);

      allFiles.push(
        iterateFilesAndFolders(subDirectoryFiles, subDirectoryName)
      );
    } else if (file.isFile()) {
      allFiles.push(file);
    } else {
      console.warn('[treeView] Its not a file as well as directory.', file);
    }
  });
  return allFiles;
}
