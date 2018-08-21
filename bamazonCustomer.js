//npms require

var mysql = require("mysql");
var inquirer = require("inquirer");
var tto = require('terminal-table-output').create();

//Welcome Message 
console.log("Hello! Loading Bamazon");

//create connection
var connection = mysql.createConnection({
  host: "localhost",
  root: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})

connection.connect(function(err){
  if(err) throw err;
  console.log("Connection established!")
  bamazon();
});

var bamazon = function(){

  console.log("\n-------------------------------");
  console.log("Here's what's available for purchase");
  console.log("--------------------------------\n")

  connection.query("SELECT * FROM bamazon",function(err,res){
    
  })

  inquirer.prompt({
    
  })



};