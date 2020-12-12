const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function generateTeam() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter employee name: '
            },
            {
                type: 'list',
                name: 'role',
                message: 'Employee role',
                choices: ['Manager', 'Engineer', 'Intern'],
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter employee email address: '
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter employee id: '
            },

        ])
        .then(function ({ name, role, id, email}) {
            let roleAnswer = "";
            if (role === "Engineer") {
                roleAnswer = "GitHub username"
            } else if (role === "Intern") {
                roleAnswer = "School name";
            } else {
                roleAnswer = "Office number"
            }
            inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "addTeamMember",
                    message: "would you like to add more team member?"
                }
            ])
        })



        


};

generateTeam();