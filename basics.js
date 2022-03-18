// execute to enter in mysql
mysql -u root -p
mysql -u local -p
mysql -u root -p < db/schema.sql

// source executes script files
source db.sql or db/schema.sql or seed.sql

CREATE DATABASE new_database;
USE new_database;

// create table
CREATE TABLE new_table (
  id INTEGER AUTO_INCREMENT PRIMARY KEY, // you can limit how long id, like the VARCHAR
  row_one VARCHAR(30) NOT NULL,
  row_two VARCHAR(30) NOT NULL,
  row_three VARCHAR(30) NOT NULL,
  boolean_true_false BOOLEAN NOT NULL
  CONSTRAINT fk_party FOREIGN KEY (foreign_key) REFERENCES new-table(id) ON DELETE SET NULL
);

DESCRIBE new_table;

SHOW TABLES;
SHOW FULL TABLES;

// add data to the table
INSERT INTO new_table (row_one, row_two , row_three, boolean_true_false)
VALUES
  ('data_for_row_one', 'data_for_row_tow', 'data_for_row_three', boolean 0 or 1),
  ('data_for_row_one', 'data_for_row_tow', 'data_for_row_three', boolean 0 or 1),
  ('data_for_row_one', 'data_for_row_tow', 'data_for_row_three', boolean 0 or 1);

// show table content
SELECT * FROM new_table;

// show target column
SELECT data_for_row_one, data_for_row_tow
FROM new_table;

SELECT data_for_row_one, boolean_true_false
FROM new_table
WHERE boolean_true_false = 0 or 1; // filter operator. < > != OR AND

// show 1 column
SELECT DISTINCT column_name FROM new_database

// reset the AUTO_INCREMENT column using the ALTER TABLE
// value: The next value that will be used in the AUTO_INCREMENT column.
ALTER TABLE new_table AUTO_INCREMENT = value;

// UPDATE statement
UPDATE new_table
SET boolean_true_false = 0 or 1
WHERE id = id; // location

// delete row
DELETE FROM new_table
WHERE id=id;

// delete database
DROP DATABASE IF EXISTS new_database;

// delete table
DROP TABLE table1;

// ALTER TABLE statement. This statement allows you to add a new field, delete an existing field, or modify a field.
ALTER TABLE new_table ADD COLUMN foreign_key INTEGER;


// in .js file: This method is the key component that allows SQL commands to be written in a Node.js application
db.query(`SELECT * FROM new_database`, (err, rows) => {
  console.log(rows);
});


// C-12
source db/schema.sql;
source db/seed.sql;
SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;