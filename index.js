// Ensures dotenv runs before everything else
require('dotenv').config();
// Importing database connection
const db = require('./config/connection');
// Import and require mysql2
const mysql = require('mysql2');
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
    'Update Employee Manager',
    'View Employees By Manager',
    'View Employees By Department',
    'Delete Department',
    'Delete Role',
    'Delete Employee',
    'Quit'
]

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
function init(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What would you like to do?',
            choices: [
                options[0], 
                options[1], 
                options[2], 
                options[3], 
                options[4], 
                options[5], 
                options[6], 
                options[7], 
                options[8], 
                options[9], 
                options[10], 
                options[11],
                options[12],
                options[13]
            ]
        }
    ])
    // Defines what to do with the data received
    .then((answer) => {

        // Use switch case to check which option the user selected
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
                viewRoles();
                break;
            case options[8]:
                viewRoles();
                break;
            case options[9]:
                viewRoles();
                break;
            case options[10]:
                viewRoles();
                break;
            case options[11]:
                viewRoles();
                break;
            case options[12]:
                viewRoles();
                break;
            case options[13]:
                viewDept();
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

addDept = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department you would like to add.'
        }
    ])
    .then((answer) => {
        console.log('This is department: ', answer.department);
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
    let empObj;
    let roleObj;
    let employees = []
    let managerId = []
    let roles = []
    let roleId = []
    dbCon.promise().query(`SELECT * FROM employee`)
        .then( ([rows,fields]) => {
            for(let i = 0; i < rows.length; i++) {
                employees.push(`${rows[i].first_name} ${rows[i].last_name}`);
                managerId.push(`${rows[i].id}`)
            }
            empObj = rows;
        })
        .catch(console.log);
    dbCon.promise().query(`SELECT * FROM role`)
        .then( ([rows,fields]) => {
            for(let i = 0; i < rows.length; i++) {
                roles.push(`${rows[i].title}`);
                roleId.push(`${rows[i].id}`);
            }
            roleObj = rows;
        })
        .catch(console.log);
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
            choices: (() => {
                if(!employees.includes('None'))
                employees.push('None');
            return employees;
            })()
        }
    ])
    .then((answers) => {
        let queryObj = {
            first_name: answers.first,
            last_name: answers.last,
            role_id: (() => {
                for(let i = 0; i < roleObj.length; i++) {
                    if (answers.role == roleObj[i].title){
                        return roleObj[i].id;
                    }
                }
            })(),
            manager_id: (() => {
                for(let i = 0; i < empObj.length; i++){
                    if (answers.manager == `${empObj[i].first_name} ${empObj[i].last_name}`){
                        return empObj[i].id;
                    }
                }
            })()
        
        }
        if(answers.manager == 'None'){
            queryObj.manager_id = null;
        }
        return queryObj;
    })
    .then((queryObj) => {

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

viewDept = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT * FROM department ORDER BY name;`)
        .then( ([rows,fields]) => {
            // Logs the database information to the console in a formatted table
            console.table('', rows);
            // Triggers inquirer prompts after data output
            init();
        })
        .catch(console.log);
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
        .catch(console.log);
};

// Calls init function to trigger inquirer prompts to start the application
init();