const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// function inquirer/prompt question
function firstPrompt() {
  db.connect((err) => {
    if (err) throw err;
  });

  console.log(`
    ==============================
    =                            =
    =      Employee Manager      =
    =                            =
    ==============================
    `);

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
        'Quit',
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

          break;

        // MVP
        case 'View all Roles':
          allRoles();
          firstPrompt();

          break;

        // MVP
        case 'View all employees':
          allEmployees();
          firstPrompt();

          break;

        // // MVP
        // case 'Add Department':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'Department',
        //         type: 'input',
        //         message: 'Please enter the department you would like to add?',
        //         validate: (answer) => {
        //           if (answer !== '') {
        //             return true;
        //           }
        //           return 'Please enter at least one character.';
        //         },
        //       },
        //     ])
        //     .then((answers) => {
        //       // Adds department to database
        //       addDepartment(answers.Department);
        //       firstPrompt();
        //     });
        //   break;

        // // MVP
        // case 'Add Role':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'title',
        //         type: 'input',
        //         message: "Please enter the role's title.",
        //         validate: (answer) => {
        //           if (answer !== '') {
        //             return true;
        //           }
        //           return 'Please enter at least one character.';
        //         },
        //       },
        //       {
        //         name: 'salary',
        //         type: 'input',
        //         message: "Please enter the role's salary.",
        //       },
        //       {
        //         name: 'department_id',
        //         type: 'input',
        //         message: 'Please enter the department id.',
        //       },
        //     ])
        //     .then((answers) => {
        //       // Adds role to database
        //       addRole(answers.title, answers.salary, answers.department_id);
        //       firstPrompt();
        //     });
        //   break;

        // // MVP
        // case 'Add employee':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'employeeFirst',
        //         type: 'input',
        //         message: "What is the employee's first name?",
        //         validate: (answer) => {
        //           if (answer !== '') {
        //             return true;
        //           }
        //           return 'Please enter at least one character.';
        //         },
        //       },
        //       {
        //         name: 'employeeLast',
        //         type: 'input',
        //         message: "What is the employee's last name?",
        //         validate: (answer) => {
        //           if (answer !== '') {
        //             return true;
        //           }
        //           return 'Please enter at least one character.';
        //         },
        //       },
        //       {
        //         name: 'department',
        //         type: 'input',
        //         message: 'Please enter the role id',
        //       },
        //       {
        //         name: 'manager',
        //         type: 'input',
        //         message: 'Please enter manager id',
        //       },
        //     ])
        //     .then((answers) => {
        //       addEmployee(answers.employeeFirst, answers.employeeLast, answers.department, answers.manager);
        //       firstPrompt();
        //     });

        //   break;

        // // MVP
        // case 'Update employee role':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'employeeId',
        //         type: 'input',
        //         message: "Please enter employee's id",
        //       },
        //       {
        //         name: 'roleId',
        //         type: 'input',
        //         message: "Please enter role's id",
        //       },
        //     ])
        //     .then((answers) => {
        //       // Updates employee's role
        //       updateByRole(answers.employeeId, answers.roleId);
        //       firstPrompt();
        //     });

        //   break;

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

        // NOT MVP
        case 'Quit':
          console.log('Tchau Tchau');
          process.exit();
      }
    });
}

// 'View all departments'
function allDepartments() {
  let departmentAll = db.query(
    'SELECT id, department FROM department;',

    function (error, departmentAll) {
      if (error) throw error;

      console.log('\n');

      console.table(departmentAll);
    }
  );
}

// "View all employees",
function allEmployees() {
  let employeesAll = db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",

    function (error, employeesAll) {
      if (error) throw error;

      console.log('\n');

      console.table(employeesAll);
    }
  );
}

// "View all roles"
function allRoles() {
  let rolesAll = db.query(
    'SELECT title, salary, department_id FROM role;',

    function (error, rolesAll) {
      if (error) throw error;

      console.log('\n');

      console.table(rolesAll);
    }
  );
}

// // "Add Department"
// function addDepartment(department) {
//   let department = db.query('INSERT INTO department SET d_name = ?', [department], function (error, department) {
//     if (error) throw error;
//     // console.table(manager)
//   });

//   departmentTable();
// }

// // "Add role"
// function addRole(title, salary, department_id) {
//   let newRole = db.query('INSERT INTO role SET title = ?, salary = ?, department_id = ?', [title, salary, department_id], function (error, newRole) {
//     if (error) throw error;
//     // console.table(manager)
//   });

//   allRoles();
// }

// // "View all employees by department",
// function allByDepartment() {
//   let department = db.query(
//     'SELECT employee.id, employee.first_name, employee.last_name, department.d_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;',

//     function (error, department) {
//       if (error) throw error;
//       console.table(department);
//     }
//   );
// }

// // "View all employees by manager",
// function AllByManager() {
//   let manager = db.query(
//     'SELECT employee.id, employee.first_name, employee.last_name, department.d_name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;',

//     function (error, manager) {
//       if (error) throw error;
//       console.table(manager);
//     }
//   );
// }

// // "Update employee manager"
// function updateByManager(managerId, employeeId) {
//   let updateManager = db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId], function (error, updateManager) {
//     if (error) throw error;
//     // console.table(manager)
//   });

//   AllByManager();
// }

// // "Add employee"
// function addEmployee(employeeFirst, employeeLast, department, manager) {
//   let add = db.query('INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?', [employeeFirst, employeeLast, department, manager], function (error, add) {
//     if (error) throw error;
//   });

//   allEmployees();
// }

// // Shows departments only, without employees
// function departmentTable() {
//   let depTable = db.query(
//     'SELECT d_name FROM department;',

//     function (error, depTable) {
//       if (error) throw error;
//       console.table(depTable);
//     }
//   );
// }

// // "Remove employee"
// function removeEmployee(id) {
//   let add = db.query('DELETE FROM employee WHERE id = ?', [id], function (error, id) {
//     if (error) throw error;
//   });

//   allEmployees();
// }

// // "Update employee role",
// function updateByRole(employeeId, roleId) {
//   let byRole = db.query(
//     'UPDATE employee SET role_id = ? WHERE id = ?',

//     [roleId, employeeId],
//     function (error, role) {
//       if (error) throw error;
//     }
//   );
//   allByDepartment();
// }

firstPrompt();
