//npms require

var mysql = require("mysql");
var inquirer = require("inquirer");

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

var updateAmount = function(res,id,amount){
    //this may not be the best way to write this?
    //do res[id + 1]? 
    //but then also maybe not bc what if an item is deleted from the store?
  res.forEach(element => {
    if(parseInt(element.item_id) === id){
      if(parseInt(element.stock_quantity) < amount){
        console.log("Insufficient stock. You cannot buy that");
        playAgain();
      }
      else{
        var total = amount * parseFloat(element.price);
        var new_amount = parseInt(element.stock_quantity) - amount;
        console.log("You have purchased " + amount + " " + element.product_name
        + " for $" + total);

        connection.query("UPDATE products SET ? WHERE ?",[
          {
            stock_quantity: new_amount
          },
          {
            item_id: id
          }],function(err,res2){
            if(err) throw err;
            playAgain();
          })
        
      }
    }
  });

};

//play again function
var playAgain = function(){
  inquirer.prompt([{
    type: "confirm",
    name: "playAgain",
    message: "Would you like to continue shopping?"
  }]).then(function(user){
    if(user.playAgain){
      bamazon();
    }
    else{
      console.log("Thank you for shopping with us!");
      console.log("Goodbye!");
      connection.end();
    }
  });
}

//display product
var bamazon = function(){

  console.log("\n-------------------------------");
  console.log("Here's what's available for purchase");
  console.log("--------------------------------\n")

  connection.query("SELECT * FROM products",function(err,res){
    if(err) throw err;

    res.forEach(element => {
      console.log("| ID: " + element.item_id +
      " | Item: " + element.product_name + 
      " | Department: " + element.department_name + 
      " | Price: $" + element.price +
      " | Quantity Available: " + element.stock_quantity);
      
    });
  

    inquirer.prompt([{
        type: "input",
        name: "itemID",
        message: "What would you like to buy? Please enter the ID of item"
      },
      {
        type: "input",
        name: "amount",
        message: "How much would you like to buy?"
      }]).then(function(user){
      var id = parseInt(user.itemID);
      var amount = parseInt(user.amount);

      if(!id || !amount || amount <= 0){
        console.log("Incorrect inputs. Cannot purchase item.");
        playAgain();
      }
      else{
        updateAmount(res,id,amount);
      }

    });
  });


};

//create connection and start game
connection.connect(function(err){
  if(err) throw err;
  console.log("Connection established!")
  bamazon();
});