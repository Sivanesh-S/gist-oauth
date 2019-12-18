const fs = require('fs');

module.exports = function(location) {
  const files = readCurrentDirectory(location);
  allFiles = iterateFilesAndFolders(files, location);
  console.log('allFiles', allFiles);
};

function readCurrentDirectory(location, withFileTypes = true) {
  return fs.readdirSync(location, { withFileTypes });
}

function writeLine() {}

function iterateFilesAndFolders(files, location) {
  const allFiles = {};

  files.forEach(file => {
    const currentLocation = `${location.replace(__dirname, '')}\\${file.name}`;

    if (file.isDirectory()) {
      allFiles[currentLocation] = file;
      const subDirectoryLocation = `${location}\\${file.name}`;
      const subDirectoryFiles = readCurrentDirectory(subDirectoryLocation);
      allFiles[currentLocation].children = iterateFilesAndFolders(
        subDirectoryFiles,
        subDirectoryLocation
      );
    } else if (file.isFile()) {
      allFiles[currentLocation] = file.name;
    } else {
      console.warn('[treeView] Its not a file as well as directory.', file);
    }
  });

  return allFiles;
}

// Array structure
function ArrayIterateFilesAndFolders(files, location) {
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
