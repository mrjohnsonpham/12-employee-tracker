const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const promisemysql = require("promise-mysql");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Iloverocky21!",
    database: "employee_tracker_db"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  // function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "menu",
        type: "list",
        message: "Please choose one of the following:",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles", 
            "Add Employees",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit"
        ]
      })
      .then(function(answer) {
        switch(answer.choices){
            case "View All Employees":
            employeeView();
            break;

            case "Exit":
                    exit();
                    break;

        }
  })
}

function employeeView() {
  connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      console.log("\n");
      runSearch();
  })
};

function exit() {
  connection.end();
}