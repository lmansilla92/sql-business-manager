// Ensures dotenv runs before everything else
require('dotenv').config();
// Importing database connection
const db = require('./config/connection');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// Import console.table for terminal formatting of db query data
const cTable = require('console.table');

// const app = express();
// const PORT = process.env.PORT || 3001;

// Middleware to parse json and urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const dbCon = mysql.createConnection(db);


// app.get('/api/department', (req, res) => {
//     const sql = 'SELECT * FROM department ORDER BY name;'
//     dbCon.query(sql, (err, data) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//            return;
//         }
//         res.json({
//           message: 'success',
//           departments: data
//         });
//     });
// });

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
async function init(){
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
        // viewDept();
        // console.log(answer.main);
        // console.log(answer);
        // console.log(answer.main);
        // console.log(options[5]);
        

        // let logoText = answers.text.toUpperCase();
        // let textColor = answers.textColor.toLowerCase();
        // const shapeColor = answers.shapeColor.toLowerCase();
        // console.log('Logo text: ', logoText);
        // console.log('Text color: ', textColor);
        // console.log('Shape: ', answers.shape);
        // console.log('Shape color: ', shapeColor);

        // Use switch case to check which option the user selected
        switch (answer.main) {
            case options[5]:
                console.log(answer);
                viewDept();
                console.log(answer);
                break;
            case 'Triangle':
                answers.shape = new Triangle(answers.shapeColor);
                break;
            case 'Square':
                answers.shape = new Square(answers.shapeColor);
                break;
                default:
                    return;
        }

        // // Checks to make sure user didn't enter more than 3 characters for logo text
        // if(answers.text.length < 4){
        //     console.log(answers);
        // }else {
        //     // Logs message to console if user entered more than 3 characters
        //     console.log('Logo text must up to 3 characters.');
        //     return;
        // }

        // // Declares fileData and assigns the value of the svg which is a function that returns svg code
        // let fileData = svg(answers.shape.renderShape(), logoText, textColor);
        // // Writes the logo.svg file with the svg code returned from the svg function 
        // writeToFile('logo.svg', fileData);
    })

    // Logs error if there is an error
    .catch((error) => {
        console.log(error);
    });
};

viewDept = () => {
    dbCon.promise().query(`SELECT * FROM department ORDER BY name;`)
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
        .then( () => dbCon.end());
}

// con.promise().query("SELECT 1")
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then( () => con.end());

init();








// app.get('/api/department', (req, res) => {
//     const sql = `SELECT * FROM department ORDER BY name;`;
    
//     sequelize.promise().query(sql, (err, departments) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//          return;
//       }
//       res.json({
//         message: 'success',
//         data: departments
//       });
//     });
// });


    // const sql = `SELECT * FROM department ORDER BY name;`;

    // sequelize.query(
    //     sql,
    //     function(err, results, fields) {
    //       console.log(results); // results contains rows returned by server
    //       console.log(fields); // fields contains extra meta data about results, if available
    //     }
    //   );
    // sequelize.promise().query('SELECT * FROM department ORDER BY name', (err, res) => {
    //     if (err) {
    //         res.status(500).error({ error: err.message });
    //         return;
    //     }
    //     res.json(res);
    // })
    // res.json(console.log(sequelize));

//   con.promise().query("SELECT 1")
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then( () => con.end());