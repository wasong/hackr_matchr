// Member class
var Member = function (userName, firstName, lastName, profilePicture, frontEndProficiency, backEndProficiency, androidProficiency, iosProficiency, systemsProficiency, gameProficiency) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.frontEndProficiency = frontEndProficiency;
        this.backEndProficiency = backEndProficiency;
        this.androidProficiency = androidProficiency;
        this.iosProficiency = iosProficiency;
        this.systemsProficiency = systemsProficiency;
        this.gameProficiency = gameProficiency;

    this.setProficiency = function (frontEnd, backEnd, systems, ios, android, game) {
        this.frontEndProficiency = frontEnd;
        this.backEndProficiency = backEnd;
        this.systemsProficiency = systems;
        this.iosProficiency = ios;
        this.androidProficiency = android;
        this.gameProficiency = game;
    };
}

$(document).ready(function () {

    
    // Example profile
    var profileOne = {"userName": "userOne", 
                      "firstName": "Guy",
                      "lastName": "Buddy",
                      "profilePicture": "https://www.google.com",
                      "filesCommittedTo": [
                          {"fileName": "one.cpp", "linesAdded": 100, "linesRemoved": 4},
                          {"fileName": "two.js", "linesAdded": 32, "linesRemoved": 7},
                          {"fileName": "three.css", "linesAdded": 2, "linesRemoved": 24},
                          {"fileName": "four.html", "linesAdded": 47, "linesRemoved": 0},
                          {"fileName": "five.py", "linesAdded": 95, "linesRemoved": 53},
                          {"fileName": "six.swift", "linesAdded": 45, "linesRemoved": 45},
                          {"fileName": "seven.java", "linesAdded": 5, "linesRemoved": 35},
                          {"fileName": "eight.unity", "linesAdded": 0, "linesRemoved": 0},
                      ]
                     },
        findFileType = function (file) {
            var extension = file.substr(file.lastIndexOf('.') + 1);
            switch (extension.toLowerCase()) {
                    // Front-End
                case 'html':
                case 'css':
                case 'less':
                case 'sass':
                    return 1;
                    // Back-End
                case 'js':
                case 'jsx':
                case 'py':
                case 'rb':
                case 'php':
                    return 2;
                    // Software
                case 'cpp':
                case 'c':
                case 'go':
                case 'cs':
                    return 3;
                    // Mobile - IoS
                case 'swift':
                case 'm':
                    return 4;
                    // Mobile - Android
                case 'java':
                    return 5;
                    // Game
                case 'unity':
                case 'fbx':
                    return 6;
                default:
                    break;
                }
        },
        calculateDevType = function (newUser) {
            var member = new Member(newUser["userName"], newUser["firstName"], newUser["lastName"], newUser["profilePicture"], 0, 0, 0, 0, 0, 0),
                i, currentFile, fileType, linesCommitted, frontEnd = 0, backEnd = 0, systems = 0, android = 0, ios = 0, game = 0, total = 0,
                filesCommittedTo = newUser["filesCommittedTo"];
            for (i = 0; i < filesCommittedTo.length; i = i + 1) {
                currentFile = filesCommittedTo[i];
                fileType = findFileType(currentFile.fileName);
                linesCommitted = currentFile.linesAdded + currentFile.linesRemoved;
     
                // Add number of lines committed to corresponding skill
                if (fileType === 1) {
                    frontEnd += linesCommitted;
                } else if (fileType === 2) {
                    backEnd += linesCommitted;
                } else if (fileType === 3) {
                    systems += linesCommitted;
                } else if (fileType === 4) {
                    ios += linesCommitted;
                } else if (fileType === 5) {
                    android += linesCommitted;
                } else if (fileType === 6) {
                    game += linesCommitted;
                } else {
                    // paid option
                }
            }
            member.setProficiency(frontEnd, backEnd, systems, ios, android, game);
            return member;
        };
});
