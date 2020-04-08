#### Admin

````sql

CREATE TABLE admin (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, salt VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, PRIMARY KEY (id));

````


#### Catergories

````sql

CREATE TABLE categories (id int NOT NULL AUTO_INCREMENT, category VARCHAR(255) NOT NULL, PRIMARY KEY (id));
````


#### Products

````sql

CREATE TABLE products (id int NOT NULL AUTO_INCREMENT, product_name VARCHAR(255) NOT NULL, price int, category_id int, PRIMARY KEY (id), FOREIGN KEY (category_id) REFERENCES categories(id));
````

#### Join

````sql

SELECT products.id, product_name, price, categories.category AS category FROM products LEFT JOIN categories ON products.category_id = categories.id LIMIT 0, 10;
````