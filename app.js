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
        .then(function ({ name, role, id, email }) {
            let teamMember;

            // Engineeer section
            if (role === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "github",
                            message: "What is employee's GitHub?"
                        },
                        {
                            type: "confirm",
                            name: "addTeamMember",
                            message: "would you like to add more team member?"
                        }
                    ])
                    .then(function ({ addTeamMember, github }) {
                        teamMember = new Engineer(name, id, email, github)
                        employees.push(teamMember);
                        if (addTeamMember) {
                            generateTeam();
                        } else {
                            render(employees);
                            fs.writeFile(outputPath, render(employees), (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            console.log("Succesfully created team information");
                        }
                    });
            
            // Intern Section
            } else if (role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "school",
                            message: "What is intern's school?"
                        },
                        {
                            type: "confirm",
                            name: "addTeamMember",
                            message: "would you like to add more team member?"
                        }
                    ])
                    .then(function ({ addTeamMember, school }) {
                        teamMember = new Intern (name, id, email, school)
                        employees.push(teamMember);
                        if (addTeamMember) {
                            generateTeam();
                        } else {
                            console.log("done");
                        }
                    });

            // Manager section
            } else {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "What is manager's office number?"
                        },
                        {
                            type: "confirm",
                            name: "addTeamMember",
                            message: "would you like to add more team member?"
                        }
                    ])
                    .then(function ({ addTeamMember, officeNumber }) {
                        teamMember = new Manager (name, id, email, officeNumber)
                        employees.push(teamMember);
                        if (addTeamMember) {
                            generateTeam();
                        } else {
                            console.log("done");
                        }
                    });
            }

        })

        .catch((err) => {
            if (err) {
                console.log("Error: ", err);
            }
        });






};

generateTeam();