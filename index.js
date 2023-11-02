// Importing dotenv to hide db password
require('dotenv').config();
// Importing database connection
const db = require('./config/connection');
// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer to use inquirer.prompt
const inquirer = require('inquirer');
// Import console.table for terminal formatting of db query data
const cTable = require('console.table');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');

// Connect to database
const dbCon = mysql.createConnection(db);

// Inquirer options
const options = [
    'View All Employees', 
    'Add Employee', 
    'Update Employee Role',
    'View All Roles',
    'Add Role',
    'View All Departments',
    'Add Department',
    'Quit'
]

// Function that initializes the application
init = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What would you like to do?',
            choices: options
        }
    ])
    // Defines what to do with the data received
    .then((answer) => {

        // Use switch case to check which option the user selected and calls the appropriate function
        switch (answer.main) {
            case options[0]:
                viewEmployees();
                break;
            case options[1]:
                addEmployee();
                break;
            case options[2]:
                updateRole();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[4]:
                addRole();
                break;
            case options[5]:
                viewDept();
                break;
            case options[6]:
                addDept();
                break;
            case options[7]:
                console.log('Goodbye!');
                dbCon.end();
                break;
                default:
                    return;
        }
    })

    // Logs error if there is an error
    .catch((error) => {
        console.log(error);
    });
};

// Adds a new department
addDept = () => {

    // Prompts for user input
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department you would like to add.'
        }
    ])
    // promise chaining and retrieve data from prompt input
    .then((answer) => {
        // Queries the database to add a department using prepared statement 
        dbCon.query(`INSERT INTO department (name)
        VALUES (?);`, answer.department, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        console.log(`${answer.department} has been added to the database!`)
       init();
    })
}

// Update employee role
updateRole = () => {
    // Declare global variables within this function
    let empObjArr;
    let roleObjArr;
    let employees = [];
    let roles = [];

    // Async DB query to get all data from employee table
    dbCon.promise().query(`SELECT * FROM employee`)
        .then( ([rows,fields]) => {
            // Iterate through data from employee table to push the first and last name of each employee into the employees array
            for(let i = 0; i < rows.length; i++) {
                employees.push(`${rows[i].first_name} ${rows[i].last_name}`);
            }
            // Assigns the data from the employee table into employee object array
            empObjArr = rows;
            return employees;
        })
    // Async DB query to get all data from role table
    dbCon.promise().query(`SELECT * FROM role`)
        .then( ([rows,fields]) => {
            // Iterates through data from query and pushes each role title to the roles array
            for(let i = 0; i < rows.length; i++) {
                roles.push(rows[i].title);
            }
            // Assigns the data from the DB query to the roleObjArr which contains an array of objects for each role
            roleObjArr = rows;
            // returns a promise to add another .then 
            return roles;
        })
        .catch((error) => console.log(error))
        // After all employee and role data is gathered, inquirer prompts user to select an employee and the new role
        .then( () => {

            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Select employee to update their role.",
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "Select new role.",
                    choices: roles
                }
            ])
        
        .then((answers) => {
            // Declares the queryObj that contains the information needed to add a new role
            let queryObj = {
  
                // Uses for loop to iterate through all department names and compares the department selected by the user
                role_id: (() => {
                    for(let i = 0; i < roleObjArr.length; i++) {
                        // If the user selected department name is the same as the current department in the iteration
                        if (answers.role == roleObjArr[i].title){
                            // Return the department id from the department objects array
                            return roleObjArr[i].id;
                        };
                    };
                })(),
                full_name: answers.employee
            };
            // Return the query object defined in this .then call back function
            return queryObj;
        })
        // .then promise chain that contains the query object returned from the previous .then
        .then((queryObj) => {

            // Queries the database to add a new role to the role table using a prepared statement
            dbCon.query(`UPDATE employee
            SET employee.role_id = ?
            WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?;`, [queryObj.role_id, queryObj.full_name], (err, result) => {
                if (err) {
                  console.log('logging error: ', err);
                }
              });
            // Logs to the console if the new role was successfully added. 
            console.log(`${queryObj.full_name} had their role updated!`)
        init();
        })
        .catch((error) => console.log('Logging error: ', error));
        })



}

// Function to add a role
addRole = () => {
    // Declares variables for the array of Department Objects and an array of departments
    let deptObjArr;
    let departments = []

    // Async Query the database to get all data from department table
    dbCon.promise().query(`SELECT * FROM department`)

        .then( ([rows,fields]) => {
            // Iterate through the query data results to store all department names 
            for( let i = 0; i < rows.length; i++) {
                departments.push(rows[i].name)
            }
            // Assigns deptObjArr the value of the array of objects that contain each department id and name
            deptObjArr = rows;
        })
        .catch((error) => console.log(error));

    // Prompts users with questions to obtain user input and selection
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the name of the new role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary?"
        },
        {
            type: 'list',
            name: 'department',
            message: "Which department does this role belong to?",
            choices: departments 
        }
    ])
    // .then promise chain that has a callback function which contains the answers from the inquirer prompt
    .then((answers) => {
        // Declares the queryObj that contains the information needed to add a new role
        let queryObj = {
            title: answers.title,
            salary: answers.salary,
            // Uses for loop to iterate through all department names and compares the department selected by the user
            department_id: (() => {
                for(let i = 0; i < deptObjArr.length; i++) {
                    // If the user selected department name is the same as the current department in the iteration
                    if (answers.department == deptObjArr[i].name){
                        // Return the department id from the department objects array
                        return deptObjArr[i].id;
                    };
                };
            })()
        };
        // Return the query object defined in this .then call back function
        return queryObj;
    })
    // .then promise chain that contains the query object returned from the previous .then
    .then((queryObj) => {

        // Queries the database to add a new role to the role table using a prepared statement
        dbCon.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`, [queryObj.title, queryObj.salary, queryObj.department_id], (err, result) => {
            if (err) {
              console.log('logging error: ', err);
            }
          });
        // Logs to the console if the new role was successfully added. 
        console.log(`${queryObj.title} has been added to the database!`)
       init();
    })
    .catch((error) => console.log('Logging error: ', error));
}


// Add Employee function
addEmployee = () => {
    // Declares global variables needed within add employee function
    let empObj;
    let roleObj;
    let employees = ['None']
    let roles = []

    // Async DB query to get all data from employee table
    dbCon.promise().query(`SELECT * FROM employee`)
        .then( ([rows,fields]) => {
            // Iterate through array of objects to retrieve each employee full name and managerId
            for(let i = 0; i < rows.length; i++) {
                employees.push(`${rows[i].first_name} ${rows[i].last_name}`);
            }
            // Assigns value to empObj as an array of objects for each employee
            empObj = rows;
        })
        .catch((error) => console.log('Logging error: ', error));

    // Async DB query to get all data from role table
    dbCon.promise().query(`SELECT * FROM role`)
        .then( ([rows,fields]) => {
            // Iterate through array of objects to retrieve each role title and pushes it to the roles array
            for(let i = 0; i < rows.length; i++) {
                roles.push(`${rows[i].title}`);
            }
            // Assigns value to empObj as an array of objects for each role
            roleObj = rows;
        })
        .catch((error) => console.log('Logging error: ', error));

    // After all data needed is retrieved inquirer prompts user with information needed to add an employee
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first',
            message: "Enter the new employee's first name."
        },
        {
            type: 'input',
            name: 'last',
            message: "Enter the new employee's last name."
        },
        {
            type: 'list',
            name: 'role',
            message: "Select the new employee's role.",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select the new employee's manager",
            choices: employees
        }
    ])
    // Promise chain that returns the answers from inquirer prompt
    .then((answers) => {
        // Defines query object used to assign all user input and necessary information to query the database
        let queryObj = {
            first_name: answers.first,
            last_name: answers.last,
            role_id: (() => {
                // Iterate through all roles in the roleObj object 
                for(let i = 0; i < roleObj.length; i++) {
                    // Checks if the role the user selected is equal to the role title in the roles object
                    if (answers.role == roleObj[i].title){
                        // If the if statement is true, return the id of the role to assign it as role_id
                        return roleObj[i].id;
                    }
                }
            })(),
            manager_id: (() => {
                // Iterate through all employees in the empObj object 
                for(let i = 0; i < empObj.length; i++){
                    // Checks if the user selected manager matches the first and last name of an employee in each iteration
                    if (answers.manager == `${empObj[i].first_name} ${empObj[i].last_name}`){
                        // If the names match, return the id for the matching employee 
                        return empObj[i].id;
                    }
                }
            })()
        
        }
        // If the user selected None as a manager, set the manager_id in the queryObj as null
        if(answers.manager == 'None'){
            queryObj.manager_id = null;
        }
        // Returns a promise to add another .then
        return queryObj;
    })
    // Retrieved the queryObj object from the previous .then 
    .then((queryObj) => {
        // Adds a new employee to the database using a prepared statement
        dbCon.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?);`, [queryObj.first_name, queryObj.last_name, queryObj.role_id, queryObj.manager_id], (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        console.log(`${queryObj.first_name} ${queryObj.last_name} has been added to the database!`)
       init();
    })
}

// View all departments
viewDept = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT * FROM department ORDER BY name;`)
        .then( ([rows,fields]) => {
            // Logs the database information to the console in a formatted table
            console.table('', rows);
            // Triggers inquirer prompts after data output
            init();
        })
        .catch((error) => console.log('Logging error: ', error));
};


// Function that queries the database to View All Employees
viewEmployees = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT emp.id, emp.first_name, emp.last_name, title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee AS emp
    JOIN role ON role.id = emp.role_id
    JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager on manager.id = emp.manager_id
    ORDER BY emp.id;`)
        .then( ([rows,fields]) => {
            // Logs the database information to the console in a formatted table
            console.table('', rows);
            // Triggers inquirer prompts after data output
            init();
        })
};


// Function that queries the database to View All Roles
viewRoles = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT roles.id, roles.title, department.name AS department, roles.salary FROM role AS roles
    JOIN department AS department ON roles.department_id = department.id
    ORDER BY roles.title;`)
        .then( ([rows,fields]) => {
            //Logs the database information to the console in a formatted table
            console.table('', rows);
            //Triggers inquirer prompts after data output
            init();
        });
};
    
// Function that queries the database to View All Departmants
viewDept = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT * FROM department ORDER BY name;`)
        .then( ([rows,fields]) => {
            // Logs the database information to the console in a formatted table
            console.table('', rows);
            // Triggers inquirer prompts after data output
            init();
        })
        .catch((error) => console.log('Logging error: ', error));
};

// Calls init function to trigger inquirer prompts to start the application
init();