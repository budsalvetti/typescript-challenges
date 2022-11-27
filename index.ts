// Import stylesheets
import './style.css';

// A Class to represent a Folder
export class Folder {
  constructor(public name: string, public folders: Folder[], public files: FakeFile[]){}
}

// A Class to represent a File. The name is FakeFile because the term 'File' is a protected keyword
export class FakeFile {
  constructor(public name: string, public size: number){}
}

/**
 * This function will prepare some mock data which is a
 * Folder object that contains some child Folders
 */
 function getMockFolder() : Folder {
  // start creation 
  const childFolders: Folder[] = [];
  const childFiles: FakeFile[] = [];
  const childFolder = new Folder('childFolder',[],[]);

  childFolders.push(childFolder);

  const topLevelFile = new FakeFile('childFile_1',2);
  childFiles.push(topLevelFile);

  return new Folder('topLevel', childFolders, childFiles);
}


export class FileNameGetter {

  public getFileNames(folder: Folder,
    recursedFiles?: FakeFile[],
    recursedFolders?: Folder[]): string[] {

    let files: FakeFile[] = [];
    let folders: Folder[] = [];

    if (recursedFiles && recursedFiles.length) {
      files = files.concat(recursedFiles);
    }

    if (recursedFolders && recursedFolders.length) {
      folders = folders.concat(recursedFolders)
    }

    // get the top level folder file names and push them into the files array
    if (folder.files.length) {
      files = files.concat(folder.files);
    }

    // if there are any child folders will add them to the array to recurse them
    if (folder.folders.length) {
      folders = folders.concat(folder.folders);
    }

    /* now if there are any folders left we will pop off the last element and send back all
     remaining folders as folders to recurse and recurse the files as well, and keep going till 		 
    there are no more folders left */
    if (folders.length) {
      this.getFileNames(folders.pop(), files, folders);
    }

    // return a new array of the name portion only of the file
    return files.map(file => file.name).sort();

  }

}


// do it!
function printFileNames(){
  const fileNameGetter: FileNameGetter = new FileNameGetter();
  console.log(fileNameGetter.getFileNames(getMockFolder()));
}

// call the method to kick off execution
printFileNames();



