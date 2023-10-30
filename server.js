// Ensures dotenv runs before everything else
require('dotenv').config();
// Importing database connection
const db = require('./config/connection');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// Import console.table for terminal formatting of db query data
const cTable = require('console.table');

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
        },
    ])
    // Defines what to do with the data received
    .then((answer) => {

        // Use switch case to check which option the user selected
        switch (answer.main) {
            case options[0]:
                viewEmployees();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[3]:
                viewRoles();
                break;
            case options[5]:
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

// Function that queries the database to View All Employees
viewEmployees = () => {
    // Performs an async query to the database
    dbCon.promise().query(`SELECT emp.id, emp.first_name, emp.last_name, title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee AS emp
    JOIN role ON role.id = emp.role_id
    JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager on manager.id = emp.manager_id
    ORDER BY emp.first_name;`)
        .then( ([rows,fields]) => {
            // Logs the database information to the console in a formatted table
            console.table('', rows);
            // Triggers inquirer prompts after data output
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
        })
        .catch(console.log);
};

// Calls init function to trigger inquirer prompts to start the application
init();

// switch (answers.shape) {
//     case 'Circle':
//         answers.shape = new Circle(answers.shapeColor);
//         break;
//     case 'Triangle':
//         answers.shape = new Triangle(answers.shapeColor);
//         break;
//     case 'Square':
//         answers.shape = new Square(answers.shapeColor);
//         break;
//         default:
//             return;
// }