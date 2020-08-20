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
 database: "employees_tracker_db",
});
// connect to the mysql server and sql database
connection.connect(function (err) {
 if (err) throw err;
 // run the start function after the connection is made to prompt the user
 start();
});
// function which prompts the user for what action they should take
const start = () => {
 inquirer
   .prompt({
     name: "menu",
     type: "list",
     message: "Please choose one of the following:",
     choices: [
       "View All Employees",
       "View All Departments",
       "View All Roles",
       "Add Employees",
       // "Add Department",
       // "Add Role",
       // "Update Employee Role",
       // "Exit"
     ],
   })
   .then(function (answer) {
     switch (answer.menu) {
       case "View All Employees":
         employeeView();
         break;
       case "View All Departments":
         departmentView();
         break;
       case "View All Roles":
         roleView();
         break;
       case "Add Employees":
         addEmployee();
         break;
       case "Exit":
         exit();
         break;
     }
   });
};
// Function that SELECTS ALL FROM role in our schema.sql/mysql workbench.
// Connection.query helps us to connect the query
// This will go for all of the functions created
function employeeView() {
 connection.query("SELECT * FROM employee", function (err, res) {
   if (err) throw err;
   console.log("\n");
   console.table(res);
   console.log("\n");
   start();
 });
}
function departmentView() {
 connection.query("SELECT * FROM department", function (err, res) {
   if (err) throw err;
   console.log("\n");
   console.table(res);
   console.log("\n");
   start();
 });
}
function roleView() {
 connection.query("SELECT * FROM role", function (err, res) {
   if (err) throw err;
   console.log("\n");
   console.table(res);
   console.log("\n");
   start();
 });
}
function addEmployee() {
 //empty array to push inputs inside of
 const roleList = [];
 const roleIdList = [];
 //empty array to push inputs inside of
 const managerList = [];
 const managerIdList = [];
 connection.query("SELECT * FROM employees_tracker_db.role", function (
   err,
   res
 ) {
   if (err) throw err;
   for (var i = 0; i < res.length; i++) {
     roleList.push(res[i].title);
     roleIdList.push(res[i].id.toString());
   }
   connection.query("SELECT * FROM employees_tracker_db.employee", function (
     err,
     res
   ) {
     if (err) throw err;
     for (var i = 0; i < res.length; i++) {
       managerList.push(res[i].first_name + " " + res[i].last_name);
       managerIdList.push(res[i].id.toString());
     }
     // Build out the inquirer prompt to add employee's first name and last name
     inquirer.prompt([
       {
         type: "input",
         name: "firstName",
         message: "What is the Employee's first name?",
       },
       {
         type: "input",
         name: "lastName",
         message: "What is the Employee's last name?",
       },
       {
         type: "list",
         name: "role",
         message: "What is the Employee's Role ID?",
         choices: roleList
       },
       {
         type: "list",
         name: "managerId",
         message: "What is the Employee's Manager?",
         choices: managerList
       }
     ])
     .then(val => {
       connection.query(
           "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [
val.firstName,
               val.lastName,
               roleIdList[roleList.indexOf(val.role)],
               managerIdList[managerList.indexOf(val.managerId)]
           ],
           function(err, res) {
               if (err) throw err;
               console.log("\n");
               console.log("Successfully added Employee");
               console.log("\n");
               start();
           }
       );
   });
})
})
}
function exit() {
 connection.end();
}