let fs= require('fs');
let path=require('path');

let inputArr=process.argv;

// o/p ->  ['pathToNode', 'pathTofile', 'input pased in terminal']

let folderPath =inputArr[2];

// at run time we give in cmd (node fileOrganiser.js "path of folder")
// diffrenciate file by its extension 

let extensions={
    Audio:[".mp3"],
    Video:[".mp4",".mkv"],
    Document:[".pdf",".doc",".xlsx"],
    Image:[".jpeg",".jpg",".png",".gif"],
    Software:[".exe"]
};


if(fs.existsSync(folderPath)){
    // console.log("path is valid...");
    let files=fs.readdirSync(folderPath);
    for(let i=0;i<files.length; i++){
        let ext=path.extname(files[i]);

        let NameOfFolder=giveFolderName(ext);

        let organisedPath=path.join(folderPath,"..","organised");
        if(! fs.existsSync(organisedPath)){  // folder of organised path
            fs.mkdirSync(organisedPath);
        }
        let NewfolderPath=path.join(organisedPath,NameOfFolder);


        let exist= fs.existsSync(NewfolderPath);        
        if(exist){
            moveFile(folderPath,NewfolderPath,files[i]);
        }
        else{
            fs.mkdirSync(NewfolderPath);
            moveFile(folderPath,NewfolderPath,files[i]);
        }
    }
}
else{
    console.log("Please enter a valid path...");
}


// function to return folder name 
function giveFolderName(ext){
    for(let key in extensions){
        let extArr=extensions[key];
        for(let i =0; i<extArr.length; i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return 'others';
}


function moveFile(folderPath,NewfolderPath,fileName){
    let sourcepath=path.join(folderPath,fileName);
    let destination=path.join(NewfolderPath,fileName);
    fs.copyFileSync(sourcepath,destination);
}

