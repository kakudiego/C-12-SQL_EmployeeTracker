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
    =      Employee Tracker      =
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
      switch (answers.questions) {
        // MVP
        case 'View all departments':
          allDepartments();

          break;

        // MVP
        case 'View all Roles':
          allRoles();

          break;

        // MVP
        case 'View all employees':
          allEmployees();

          break;

        // MVP
        case 'Add Department':
          inquirer
            .prompt([
              {
                name: 'department',
                type: 'input',
                message: 'Enter the new department:',
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Invalid! Try again.';
                },
              },
            ])
            .then((answers) => {
              console.log('+++++ New Department created +++++');
              addDepartment(answers.department);
            });

          break;

        // MVP
        case 'Add Role':
          inquirer
            .prompt([
              {
                name: 'title',
                type: 'input',
                message: 'Enter the new role:',
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Invalid! Try again.';
                },
              },
              {
                name: 'salary',
                type: 'input',
                message: 'Enter salary ($$$$$.$$):',
              },
              {
                name: 'department_id',
                type: 'input',
                message: 'Enter the department_id (1=Sales | 2=Engineering | 3=Finance | 4=Legal)',
              },
            ])
            .then((answers) => {
              console.log('+++++ New Role created +++++');
              addRole(answers.title, answers.salary, answers.department_id);
            });

          break;

        // MVP
        case 'Add employee':
          inquirer
            .prompt([
              {
                name: 'newFirstName',
                type: 'input',
                message: 'First Name of the new employee:',
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Invalid! Try again.';
                },
              },
              {
                name: 'newLastName',
                type: 'input',
                message: 'Last Name of the new employee:',
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Invalid! Try again.';
                },
              },
              {
                name: 'department',
                type: 'input',
                message: 'New role id',
              },
              {
                name: 'manager',
                type: 'input',
                message: 'Manager id',
              },
            ])
            .then((answers) => {
              addEmployee(answers.newFirstName, answers.newLastName, answers.department, answers.manager);
            });

          break;

        // MVP
        case 'Update employee role':
          inquirer
            .prompt([
              {
                name: 'employeeId',
                type: 'input',
                message: 'Employee id',
              },
              {
                name: 'roleId',
                type: 'input',
                message: 'Role id',
              },
            ])
            .then((answers) => {
              updateRole(answers.employeeId, answers.roleId);
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

        // NOT MVP
        case 'Quit':
          inquirer
            .prompt([
              {
                name: 'quit',
                type: 'list',
                message: 'Quit?',
                choices: ['Yes', 'No'],
              },
            ])
            .then((answers) => {
              switch (answers.quit) {
                case 'Yes':
                  process.exit(console.log('Tchau Tchau'));

                  break;

                case 'No':
                  firstPrompt();

                  break;
              }
            });
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

      firstPrompt();
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

      firstPrompt();
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

      firstPrompt();
    }
  );
}

// "Add Department"
function addDepartment(department) {
  var department = db.query('INSERT INTO department SET department = ?', [department], function (error, department) {
    if (error) throw error;

    firstPrompt();
  });
}

// "Add role"
function addRole(title, salary, department_id) {
  let newRole = db.query('INSERT INTO role SET title = ?, salary = ?, department_id = ?', [title, salary, department_id], function (error, newRole) {
    if (error) throw error;

    firstPrompt();
  });
}

// "Add employee"
function addEmployee(newFirstName, newLastName, department, manager) {
  let add = db.query('INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?', [newFirstName, newLastName, department, manager], function (error, add) {
    if (error) throw error;

    firstPrompt();
  });
}

// "Update employee role",
function updateRole(employeeId, roleId) {
  let byRole = db.query(
    'UPDATE employee SET role_id = ? WHERE id = ?',

    [roleId, employeeId],
    function (error, role) {
      if (error) throw error;

      firstPrompt();
    }
  );
}

// // "View all employees by department",
// function allByDepartment() {
//   let department = db.query(
//     'SELECT employee.id, employee.first_name, employee.last_name, department.d_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;',

//     function (error, department) {
//       if (error) throw error;
//       console.table(department);

//        firstPrompt();
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

//        firstPrompt();

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

// // Shows departments only, without employees
// function departmentList() {
//   let depTable = db.query(
//     'SELECT d_name FROM department;',

//     function (error, depTable) {
//       if (error) throw error;

//       console.log('\n');

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

firstPrompt();
