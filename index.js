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
        'Remove employee',
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
              console.log('\n');
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
                message: 'Enter the department_id (1= Sales | 2= Engineering | 3= Finance | 4= Legal):',
              },
            ])
            .then((answers) => {
              console.log('\n');
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
                name: 'role_id',
                type: 'list',
                message: 'Role id (1= Sales Lead | 2= Salesperson | 3= Lead Engineer | 4= Software Engineer | 5= Account Manager | 6= Accountant | 7= Legal Team Lead | 8= Lawyer)',
                choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
              },
              {
                name: 'manager_id',
                type: 'list',
                message: 'Manager id (1= John | 2= Mike | 3= Ashley | 4= Kevin | 5= Kunal | 6= Malia | 7= Sarah | 8= Tom)',
                choices: ['1', '2', '3', '4', '5', '6', '7', '8'],
              },
            ])
            .then((answers) => {
              console.log('\n');
              console.log('+++++ New Employee created +++++');
              addEmployee(answers.newFirstName, answers.newLastName, answers.role_id, answers.manager_id);
            });

          break;

        // MVP
        case 'Update employee role':
          inquirer
            .prompt([
              {
                name: 'employee_Id',
                type: 'input',
                message: 'Enter employee_id:',
              },
              {
                name: 'role_Id',
                type: 'input',
                message: 'Enter role_id:',
              },
            ])
            .then((answers) => {
              console.log('\n');
              console.log('+++++ Role updated +++++');
              updateRole(answers.employee_Id, answers.role_Id);
            });

          break;

        // // NOT MVP
        // case 'View all employees by department':
        //   allByDepartment();

        //   break;

        // // NOT MVP
        // case 'View all employees by manager':
        //   AllByManager();

        //   break;

        // NOT MVP
        case 'Remove employee':
          inquirer
            .prompt([
              {
                name: 'employee_id',
                type: 'input',
                message: 'Enter employee_id:',
              },
            ])
            .then((answers) => {
              console.log('\n');
              console.log('+++++ Employee fired +++++');
              removeEmployee(answers.employee_id);
            });

          break;

        // // NOT MVP
        // case 'Update employee manager':
        //   inquirer
        //     .prompt([
        //       {
        //         name: 'manager',
        //         type: 'input',
        //         message: 'Enter manager_id:',
        //       },
        //       {
        //         name: 'Employee',
        //         type: 'input',
        //         message: 'Enter employee_id:',
        //       },
        //     ])
        //     .then((answers) => {
        //       updateByManager(answers.manager, answers.Employee);
        //     });

        //   break;

        // // NOT MVP
        // case 'Remove role'

        // // NOT MVP
        // case 'Remove department'

        // // NOT MVP
        // 'View total utilized budget by department'

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
                  process.exit(console.log('\n'), console.log('+++++ Tchau Tchau +++++'));

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
    "SELECT employee.id, employee.first_name AS 'first name', employee.last_name AS 'last name', role.title AS 'job tittles', department.department AS departments, role.salary AS salaries, CONCAT(manager.first_name, ' ', manager.last_name) AS managers FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",

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
    'SELECT role.title, role.id, department.department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;',

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
function addEmployee(newFirstName, newLastName, role_id, manager) {
  let add = db.query('INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?', [newFirstName, newLastName, role_id, manager], function (error, add) {
    if (error) throw error;

    firstPrompt();
  });
}

// "Update employee role",
function updateRole(employee_Id, role_Id) {
  let byRole = db.query(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [role_Id, employee_Id],

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

//       firstPrompt();
//     }
//   );
// }

// // "Update employee manager"
// function updateByManager(managerId, employeeId) {
//   let updateManager = db.query(
//     'UPDATE employee SET manager_id = ? WHERE id = ?',
//     [managerId, employeeId],

//     function (error, updateManager) {
//       if (error) throw error;

//       firstPrompt();
//     }
//   );
// }

// "Remove employee"
function removeEmployee(id) {
  let add = db.query('DELETE FROM employee WHERE id = ?', [id], function (error, id) {
    if (error) throw error;
  });

  firstPrompt();
}

firstPrompt();
