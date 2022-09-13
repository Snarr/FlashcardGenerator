let fs = require('fs');

async function main() {
  let path = ".";
  let markdownNotes = await recursiveSearchForFiles(path, ".md");
  let definitions = await findTermsAndDefinitions(markdownNotes);
  await saveToFile(`${path}/Flashcards.txt`, definitions.join('\n'));
}

main();

async function recursiveSearchForFiles(path, extension) {
  let fileList = [];
  let dirContents = await fs.promises.readdir(path);
  
  for (let i = 0; i < dirContents.length; i++) {
    let entry = dirContents[i];
    let filePath = `${path}/${entry}`;
    let fileData = await fs.promises.lstat(filePath);
    if (fileData.isDirectory()) {
      fileList = [...fileList, ...await recursiveSearchForFiles(filePath, extension)]
    } else if (filePath.endsWith(extension))  {
      fileList.push(filePath)
    }
  }
  return fileList;
}

async function findTermsAndDefinitions(files) {
  let definitions = [];
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let body = await fs.promises.readFile(file, 'utf-8');
    body = body.split('\n');

    // Find start of definition table
    let definitionStartIndex = searchForDefinitionStartIndex(body);

    // If no terms and definitions found, jump to next file
    if (definitionStartIndex == -1) continue;

    // Find end index
    let definitionEndIndex = searchForDefinitionEndIndex(body, definitionStartIndex);

    // Slice up from start and end of table
    body = body.slice(definitionStartIndex, definitionEndIndex);

    // Remove label and divider
    body.splice(0, 2);

    // Combine new and old definitions
    definitions = [...definitions, ...body];
  }
  return definitions;
}
function searchForDefinitionStartIndex(splitBody) {
  for (let i = 0; i < splitBody.length; i++) {
    let str = splitBody[i];
    if (str.includes("Term | Definition")) {
      return i
    }
  }
  return -1;
}

function searchForDefinitionEndIndex(splitBody, startIndex) {
  for (let i = startIndex; i < splitBody.length; i++) {
    if (!splitBody[i].includes('|')) {
      return i;
    }
  }
}

async function saveToFile(path, text) {
  await fs.promises.writeFile(path, text);
}