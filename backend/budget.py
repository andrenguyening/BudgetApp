from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from models import db, Category, Purchase
import json
import os
import collections
collections.Iterable = collections.abc.Iterable


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000/"])

app.config.update(dict(
	DEBUG=True,
	SECRET_KEY='secretkey',
	USERNAME='admin',
	PASSWORD='default',
	SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(app.root_path, 'budget.db')
))

db.init_app(app)

@app.cli.command('initdb')
def initdb_command():
    db.create_all()
    otherCategory = Category(name = "Other", budget = None)
    db.session.add(otherCategory)
    db.session.commit()
    

def serializeCategory(category):
    return {
        "id": category.id,
        "name": category.name,
        "budget":category.budget
    }
    
def serializePurchase(purchase):
    return {
        "id": purchase.id,
        "desc": purchase.desc,
        "amount":purchase.amount,
        "date":purchase.date,
        "category":purchase.category
    } 
    
category_month_budget = []

@app.route("/", methods = ['GET','POST'])
def default():
    categories = Category.query.all()
    purchases = Purchase.query.all()
    return render_template('budget.html',categories=categories, purchases = purchases)

@app.route("/purchases/", methods = ['GET','POST'])
def get_purchases():
    if(request.method == "POST"):
        req_data = request.get_json()
        pur = Purchase(date = req_data["date_of_purchase"], desc = req_data["desc_text"], amount = req_data["amt_num"], category = req_data["purchasecategories"])
        db.session.add(pur)
        db.session.commit()
        purchases = [serializePurchase(pur) for pur in Purchase.query.order_by(Purchase.date.desc())]
        return json.dumps(purchases)
    elif(request.method == "GET"):
        purchase_list = Purchase.query.order_by(Purchase.date.desc()).all()
        purchases = []
        for purchase in purchase_list:
            purchases.append({"id": purchase.id,
            "desc": purchase.desc,
            "amount":purchase.amount,
            "date":purchase.date,
            "category":purchase.category})
        return jsonify({'purchases': purchases})
    
@app.route("/categories/", methods = ['GET','POST'])
def get_categories():
    if(request.method == "POST"):
        req_data = request.get_json()
        if(req_data["budget_num"] == None):
            cat = Category(name = req_data["cat_name"], budget = None)
        else:
            cat = Category(name = req_data["cat_name"], budget = req_data["budget_num"])
        db.session.add(cat)
        db.session.commit()
        categories = [serializeCategory(cat) for cat in Category.query]
        return json.dumps(categories)
    elif(request.method == "GET"):
        category_list = Category.query.order_by(Category.id).all()
        
        categories = []
        for category in category_list:
            categories.append({"id": category.id,"name": category.name,"budget":category.budget})
        return jsonify({'categories': categories})
    
@app.route("/categories/<int:catid>", methods = ['GET','DELETE'])
def get_category(catid):
    if(request.method == "GET"):
        category_list = Category.query.filter_by(id = catid)
        categories = []
        for category in category_list:
            categories.append({"id": category.id,"name": category.name,"budget":category.budget})
        return jsonify({'categories': categories})
    elif(request.method == "DELETE"):
        category_to_delete  = Category.query.filter_by(id = catid).first()
        db.session.delete(category_to_delete)
        db.session.commit()
        categories = []
        category_list = Category.query.all()
        for category in category_list:
            categories.append({"id": category.id,"name": category.name,"budget":category.budget})
        return jsonify({'categories': categories})

@app.route("/purchases/<int:purid>", methods = ['GET','DELETE'])
def get_purchase(purid):
    if(request.method == "GET"):
        purchase_list = Purchase.query.filter_by(id = purid)
        purchases = []
        for purchase in purchase_list:
            purchases.append({"id": purchase.id,"desc": purchase.desc,"amount":purchase.amount, "date": purchase.date, "category":purchase.category})
        return jsonify({'purchases': purchases})
    elif(request.method == "DELETE"):
        purchase_to_delete  = Purchase.query.filter_by(id = purid).first()
        db.session.delete(purchase_to_delete)
        db.session.commit()
        purchases = []
        purchase_list = Purchase.query.all()
        for purchase in purchase_list:
            purchases.append({"id": purchase.id,"desc": purchase.desc,"amount":purchase.amount, "date":purchase.date, "category":purchase.category})
        return jsonify({'purchases': purchases})       
    
if __name__ == "__main__":
	app.run(debug=True)