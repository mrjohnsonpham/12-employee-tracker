const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promiseMySql = require("promise-mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3000
    port: 3000,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Iloverocky21!",
    database: "employees_tracker_DB"
  });