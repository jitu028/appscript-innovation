function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function findFoldersByName(folderName) {
  var foldersIterator = DriveApp.getFoldersByName(folderName);
  var folders = [];
  while (foldersIterator.hasNext()) {
    var folder = foldersIterator.next();
    folders.push({id: folder.getId(), name: folder.getName()});
  }
  return folders;
}

function getFolderContents(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  return getFolderDetails(folder);
}

function getFolderDetails(folder, path = '') {
  var contents = {
    name: folder.getName(),
    path: path + folder.getName() + '/',
    subfolders: [],
    files: []
  };

  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    contents.subfolders.push(getFolderDetails(subfolder, contents.path));
  }

  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    contents.files.push({name: file.getName(), url: file.getUrl()});
  }

  return contents;
}

