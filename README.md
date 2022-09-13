# Markdown Flashcard Generator

Markdown Flashcard Generator is a simple program that recursively searches a given notes directory, searching for a table of Terms and Definitions. This program assembles the terms and definitions from each file into one file, allowing you to mass import your terms and definitions into flashcard programs like Quizlet.


## Requirements

Markdown Flashcard Generator searches files for a table with the following format:

```
Term | Definition
--------- | ---------
Your term here | Your definition here
```

The program assumes three things in order to work:
- You only have one Term/Definition Table per file
- Your Term/Definition Table top row reads `Term | Definition` (case-sensitive)

The divider row can be any size you want, just make sure it exists.

## Configuration

The program has 3 configuration variables located at the top of the main function

```
let path = "."; // Path to a folder of plaintext notes
let extension = ".md";  // File extension of your notes
let outputFile = `${path}/Flashcards.txt`;  // Output file for all terms/definitions
```
