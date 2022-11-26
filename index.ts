// Import stylesheets
import './style.css';

class Folder {
  constructor(public name: string, public folders: Folder[], public files: FakeFile[]){}
}

class FakeFile {
  constructor(public name: string, public size: number){}
}

class FileNamePrinter {

public printFileNames(folder: Folder,
			 recursedFiles?: FakeFile[],
			 recursedFolders?: Folder[]): string[] {

  let files: FakeFile[] = [];
  let folders: Folder[] = [];
  let returnArray: string[];

  if(recursedFiles && recursedFiles.length){
    files =	files.concat(recursedFiles);
  }

  if(recursedFolders && recursedFolders.length){
	  folders = folders.concat(recursedFolders)
  }

  // get the top level folder file names and push them into the files array
  if(folder.files.length) {
    files = files.concat(folder.files);
  }

  // if there are any child folders will add them to the array to recurse them
  if(folder.folders.length){
    folders = folders.concat(folder.folders);
  }

 // now if there are any folders left we will pop off the last element and send back all
 // remaining folders as folders to recurse and recurse the files as well, and keep going till 		 
 //there are no more folders left
  if(folders.length){
	  this.printFileNames(folders.pop() , files, folders);	
  }
    
  return  files.map(file => file.name);
  
}

}

function printFileNames(){

  const childFolders: Folder[] = [];
  const childFiles: FakeFile[] = [];
  const childFolder = new Folder('childFolder',[],[]);

  childFolders.push(childFolder);

  const topLevelFile = new FakeFile('childFile_1',2);
  childFiles.push(topLevelFile);

  const topLevelFolder = new Folder('topLevel', childFolders, childFiles);

  const fileNamePrinter: FileNamePrinter = new FileNamePrinter();
 
  console.log(fileNamePrinter.printFileNames(topLevelFolder));
}

printFileNames();



