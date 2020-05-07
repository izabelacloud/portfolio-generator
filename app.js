// const fs = require("fs");
// const generatePage = require('./src/page-template.js');


// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;



// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });


const inquirer = require("inquirer");
// console.log(inquirer);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username (Required)",
            validate: GitHubUsernameInput => {
                if(GitHubUsernameInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub Username!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({confirmAbout}) => confirmAbout           
        }

    ])
    
}


const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}


    console.log(`
    ==================
    Add a New Project
    ==================
    `);

    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: ProjectDescriptionInput => {
                if(ProjectDescriptionInput) {
                    return true;
                } else {
                    console.log("Please enter your Project Description!");
                    return false;
                }
            }
            
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you this project with? (Check all that apply)",
            choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)",
            validate: ProjectGitHubLink => {
                if(ProjectGitHubLink) {
                    return true;
                } else {
                    console.log("Please enter your Project GitHub Link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData)
    });
    // .then(projectAnswers => console.log(projectAnswers));
   




