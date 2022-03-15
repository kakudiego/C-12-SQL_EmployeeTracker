const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// const PORT = process.env.PORT || 3002;
// const app = express();

function init() {
  // console.clear();
  console.log(`
  =======================================
  =                                     =
  =           Employee Manager          =
  =                                     =
  =======================================
  `);

  firstPrompt();
}

// Function for inquirer to prompt data
function firstPrompt() {
  inquirer
    .prompt({
      name: 'questions',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments', // MVP
        'View all Roles', // MVP
        'View all employees', // MVP
        'Add Department', // MVP
        'Add Role', // MVP
        'Add employee', // MVP
        'Update employee role', // MVP
        // 'View all employees by department',
        // 'View all employees by manager',
        // 'Remove employee',
        // 'Update employee manager',
        // 'Remove role',
        // 'Remove department',
        // 'View total utilized budget by department',
        // 'Quit'
      ],
      // Promise
    })
    .then((answers) => {
      // Start switch statement
      switch (answers.questions) {
        // MVP
        case 'View all departments':
          allDepartments();
          firstPrompt();

        // MVP
        case 'View all Roles':
          allRoles();
          firstPrompt();

        // MVP
        case 'View all employees':
          allEmployees();
          firstPrompt();

          break;

        // MVP
        case 'Add Department':
          inquirer
            .prompt([
              {
                name: 'Department',
                type: 'input',
                message: 'Please enter the department you would like to add?',
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Please enter at least one character.';
                },
              },
            ])
            .then((answers) => {
              // Adds department to database
              addDepartment(answers.Department);
              firstPrompt();
            });
          break;

        // MVP
        case 'Add Role':
          inquirer
            .prompt([
              {
                name: 'title',
                type: 'input',
                message: "Please enter the role's title.",
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Please enter at least one character.';
                },
              },
              {
                name: 'salary',
                type: 'input',
                message: "Please enter the role's salary.",
              },
              {
                name: 'department_id',
                type: 'input',
                message: 'Please enter the department id.',
              },
            ])
            .then((answers) => {
              // Adds role to database
              addRole(answers.title, answers.salary, answers.department_id);
              firstPrompt();
            });
          break;

        // MVP
        case 'Add employee':
          inquirer
            .prompt([
              {
                name: 'employeeFirst',
                type: 'input',
                message: "What is the employee's first name?",
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Please enter at least one character.';
                },
              },
              {
                name: 'employeeLast',
                type: 'input',
                message: "What is the employee's last name?",
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Please enter at least one character.';
                },
              },
              {
                name: 'department',
                type: 'input',
                message: 'Please enter the role id',
              },
              {
                name: 'manager',
                type: 'input',
                message: 'Please enter manager id',
              },
            ])
            .then((answers) => {
              addEmployee(answers.employeeFirst, answers.employeeLast, answers.department, answers.manager);
              firstPrompt();
            });

          break;

        // MVP
        case 'Update employee role':
          inquirer
            .prompt([
              {
                name: 'employeeId',
                type: 'input',
                message: "Please enter employee's id",
              },
              {
                name: 'roleId',
                type: 'input',
                message: "Please enter role's id",
              },
            ])
            .then((answers) => {
              // Updates employee's role
              updateByRole(answers.employeeId, answers.roleId);
              firstPrompt();
            });

          break;

        // // NOT MVP
        // case 'View all employees by department':
        //   allByDepartment();
        //   firstPrompt();

        //   break;

        // // NOT MVP
        // case 'View all employees by manager':
        //   AllByManager();
        //   firstPrompt();

        //   break;

        // // NOT MVP
        // case 'Remove employee':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'id',
        //         type: 'input',
        //         message: 'Please enter the Employee id',
        //       },
        //     ])
        //     .then((answers) => {
        //       // Removes employee to database
        //       removeEmployee(answers.id);
        //       firstPrompt();
        //     });
        //   break;

        // // NOT MVP
        // case 'Update employee manager':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'manager',
        //         type: 'input',
        //         message: 'Please enter manager id',
        //       },
        //       {
        //         name: 'Employee',
        //         type: 'input',
        //         message: 'Please enter employee id',
        //       },
        //     ])
        //     .then((answers) => {
        //       // Updates employee's manager
        //       updateByManager(answers.manager, answers.Employee);
        //       firstPrompt();
        //     });

        //   break;
      }
    });
}


db.connect((err) => {
  if (err) throw err;
  console.log('Database connected.');
  // app.listen(PORT, () => {
  //   console.log(`
  //   -
  //   Server running on port ${PORT}
  //   -
  //   `);
  // });
  init();
});
