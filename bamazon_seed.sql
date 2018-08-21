
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Die Hard DVDs","Entertainment",10.00,20),
("Toilet Paper 6pk","Home supplies",7.99,4),
("Peanut Butter","Groceries",3.99,16),
("2 Person Tent","Camping Supplies",27.99,1),
("Cleaning Solution","Home supplies",5.49,30),
("Water 24pk","Groceries",8.99,50),
("Potato Chips","Groceries",2.69,54),
("MarioKart 8","Entertainment",59.99,4),
("Red Lipstick","Beauty",12.99,7),
("Lemon-scented soap","Beauty",6.39,200);
