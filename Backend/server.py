from flask import Flask, request, make_response, jsonify
from flask_mysqldb import MySQL
import json
import hashlib
import os
import base64
import jwt

app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@ps123'
app.config['MYSQL_DB'] = 'grocery_store'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route('/')
def home():
    # Pagination

    current_pg = request.args.get('page', default = 1, type = int)
    per_page = request.args.get('per_page', default = 10, type = int)
    previous_pg_end = (current_pg - 1) * per_page

    query1 = """SELECT products.id, product_name, price, categories.category
             AS category FROM products LEFT JOIN categories ON
             products.category_id = categories.id LIMIT %s, %s"""

    query2 = """SELECT COUNT(id) AS product_count from products"""

    cursor = mysql.connection.cursor()
    cursor.execute(query1, (previous_pg_end, per_page))
    product_result = cursor.fetchall()
    
    cursor.execute(query2)
    count_result = cursor.fetchall()
    cursor.close()
    
    productList = list()
    for item in product_result:
        productList.append(item)
    
    return {"products": productList, "productCount": count_result[0]["product_count"]}


@app.route('/add/category', methods = ["POST", "GET"])
def addCategory():
    if request.method == "POST":
        ask = request.json
        category = ask["category"]
        cursor = mysql.connection.cursor()
        cursor.execute(
            """INSERT INTO categories (category) VALUES (%s)""", (category,)
        )
        mysql.connection.commit()
        cursor.close()
        return {"message": "Category added successfully"}

    elif request.method == "GET":
        cursor = mysql.connection.cursor()
        cursor.execute(
            """SELECT category FROM categories"""
        )
        result = cursor.fetchall()
        cursor.close()
        categoriesList = list()
        for item in result:
            categoriesList.append(item)
        return {"categories":categoriesList}

@app.route('/add/product', methods = ["POST"])
def addProduct():
    ask = request.json
    product_name = ask["product_name"]
    price = ask["price"]
    category = ask["category"]
    query1 = """SELECT id FROM categories WHERE category = %s"""
    query2 = """INSERT INTO products (product_name, price, category_id) VALUES (%s, %s, %s)"""
    cursor = mysql.connection.cursor()
    cursor.execute(query1, (category,))
    result = cursor.fetchall()
    category_id = result[0]["id"]

    cursor.execute(query2, (product_name, price, category_id))
    mysql.connection.commit()
    cursor.close()
    return {"message": "Product added successfully"}

@app.route('/update/product/<id>', methods = ["POST"])
def updateProduct(id):
    ask = request.json
    product_name = ask["product_name"]
    price = ask["price"]
    category = ask["category"]
    query1 = """SELECT id from categories WHERE category = %s"""
    query2 = """UPDATE products SET product_name = %s, price = %s, category_id = %s WHERE id = %s"""
    cursor = mysql.connection.cursor()
    cursor.execute(query1, (category,))
    result = cursor.fetchall()
    category_id = result[0]["id"]
    cursor.execute(query2, (product_name, price, category_id, id))
    mysql.connection.commit()
    cursor.close()
    return {"message": "Entry updated successfully"}


@app.route('/delete/product', methods = ["POST"])
def deleteProduct():
    ask = request.json
    prduct_name = ask["prduct_name"]
    query = """DELETE FROM products WHERE prduct_name = %s"""
    cursor = mysql.connection.cursor()
    cursor.execute(query, (prduct_name,))
    mysql.connection.commit()
    cursor.close()
    return {"message": "Entry deleted successfully"}

@app.route('/product/filter')
def filterProduct():
    category = request.args.get('category')
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM (SELECT products.id, product_name, price, categories.category
             AS category FROM products LEFT JOIN categories ON
             products.category_id = categories.id) as sub_table
          WHERE sub_table.category = %s""", [str(category)]
    )
    results = cursor.fetchall()
    cursor.close()
    filtered_product = list()
    for product in results:
        filtered_product.append(product)
    return {'products': filtered_product}

@app.route('/product/sort')
def sortProduct():
    sort_basis = request.args.get('sort_basis')
    cursor = mysql.connection.cursor()
    if sort_basis == "asc":
        cursor.execute(
            """SELECT products.id, product_name, price,
             categories.category AS category FROM products
              JOIN categories ON products.category_id = categories.id ORDER BY price ASC"""
        )
        result = cursor.fetchall()
    else:
        cursor.execute(
            """SELECT products.id, product_name, price,
             categories.category AS category FROM products
              JOIN categories ON products.category_id = categories.id ORDER BY price DESC"""
        )
        result = cursor.fetchall()
    cursor.close()
    sorted_list = list()
    for product in result:
        sorted_list.append(product)
    return {"products": sorted_list}

# Authentication

@app.route('/auth/signup', methods = ["POST"])
def signup():
    ask = request.json
    name = ask["name"]
    email = ask["email"]
    password = ask["password"]
    salt = generate_salt()
    salted_password = salt + password
    password_hash = hash_cycle(salted_password)

    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO admin (name, email, salt, password_hash)
         VALUES (%s, %s, %s, %s)""",
         (str(name), str(email), str(salt), str(password_hash))
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Signup Successful"}

@app.route('/auth/login', methods = ["POST"])
def login():
    ask = request.json
    email = ask["email"]
    password = ask["password"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM admin WHERE email = %s
        """, (str(email),)
    )
    result = cursor.fetchall()
    cursor.close()
    admin_data = list()
    for item in result:
        admin_data.append(item)
    if len(admin_data) is not 0:
        for admin in admin_data:
            if admin["password_hash"] == hash_cycle(admin["salt"] + password):
                encode_data = jwt.encode({"id": admin["id"]}, 'masai', algorithm='HS256')
                return json.dumps({"message": "Signin Successful!", "token": str(encode_data)})
            else:
                return {"message": "Wrong Password"}
    return {"message": "Please make sure you are a registered admin."}

def generate_salt():
    salt = os.urandom(16)
    # print(salt.encode('base-64'))
    return str(base64.b64encode(salt))

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    # print(hash.hexdigest())
    return hash.hexdigest()

def hash_cycle(string):
    for i in range(10):
        string = md5_hash(string)
    return string

def token_decoder():
    auth_header = request.headers.get("Authorization")
    token_encoded = auth_header.split(" ")[1]
    decode_data = jwt.decode(token_encoded, "masai", algorithm = ["HS256"])
    return decode_data
    
