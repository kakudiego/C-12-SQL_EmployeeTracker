inquirer
    .prompt({
      name: 'questions',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all employees by department',
        'View all employees by manager',
        'Add employee',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        // 'View all Roles',
        'Add Role',
        // 'Remove role',
        // 'View all departments',
        'Add Department',
        // 'Remove department'
        // 'View total utilized budget by department',
        // 'Quit'
      ],
      // Promise
    })